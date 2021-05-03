<template>
  <v-container fluid tag="div">
    <link rel="prefetch" href="https://lsn-api.dat.cloud/streams" />

    <v-row justify="center">
      <v-col class="mt-n5 content" tag="v-card">
        <!--<stream-filter class="mt-n1 mb-n1" @filter-changed="filterChanged" />-->
        <v-container tag="div" class="mt-3">
          <v-row align="center" class="flex-shrink-1 mt-4 mb-3 px-5 mt-auto">
            <h2 class="text-h6" v-if="team && team.name">
              <span>{{ $t("streamersInTeam") }}:</span>
              <v-img
                width="32px"
                contain
                eager
                v-if="team.image"
                :alt="team.name"
                :title="team.name"
                :src="team.image"
                class="d-inline-block"
                style="vertical-align: middle"
              />
              <span v-if="!team.image">{{ team.name }}</span>
            </h2>
          </v-row>
          <v-expand-transition>
            <featured-streamer
              v-if="featuredStreamer"
              :streamer="featuredStreamer"
              key="2"
            />
          </v-expand-transition>

          <stream-list-header
            header-styling="grey--text"
            :divider-title="$t('onlineStreams')"
            class="mt-n1 mb-n1"
          />
          <transition name="scroll-x-transition" mode="out-in">
            <stream-list-group-skeleton v-if="$fetchState.pending" key="0" />
            <stream-list-group :streamers="online" v-else key="1" />
          </transition>

          <stream-list-header
            header-styling="accent--text"
            :divider-title="$t('offlineStreams')"
            class="mt-5 mb-n1"
          />
          <transition name="scroll-x-transition" mode="out-in">
            <stream-list-group-skeleton v-if="$fetchState.pending" key="0" />
            <stream-list-group :streamers="offline" v-else key="1" />
          </transition>
        </v-container>
      </v-col>
    </v-row>

    <v-card tag="div" class="pa-2 lastUpdated" @click="update" outlined>
      <v-skeleton-loader
        :loading="$fetchState.pending"
        type="text"
        width="200px"
      >
        {{ $t("lastUpdated") }}:
        <timeago
          :datetime="lastUpdated"
          :auto-update="10"
          :locale="this.$root.$i18n.locale"
        ></timeago>
      </v-skeleton-loader>
    </v-card>
  </v-container>
</template>

<script>
import StreamListGroup from "~/components/StreamListGroup";
import StreamerEntry from "../../components/StreamerEntry";
import FeaturedStreamer from "../../components/FeaturedStreamer";
import StreamListGroupSkeleton from "../../components/StreamListGroupSkeleton";
import StreamListHeader from "../../components/StreamListHeader";

import { AVAILABLE_TEAMS } from "../../utils/constants";
export default {
  components: {
    StreamListGroupSkeleton,
    FeaturedStreamer,
    StreamerEntry,
    StreamListHeader,
    StreamListGroup,
  },

  computed: {
    team: function team() {
      const teamParam = this.$route.params.name;
      const thisTeam = AVAILABLE_TEAMS.filter(function thisTeam(t) {
        return t && t.value === teamParam;
      });
      return thisTeam ? thisTeam[0] : null;
    },
  },

  data() {
    return {
      streamer_data: [],
      lastUpdated: null,

      activeServerFilters: null,
      featuredStreamer: null,

      online: [],
      offline: [],

      updateInterval: null,
    };
  },

  fetchOnServer: false,

  async mounted() {
    this.updateInterval = setInterval(this.update, 5 * 60 * 1000);
  },

  methods: {
    filterStreamers() {
      this.offline = [];
      this.online = [];

      this.streamer_data.forEach((x) =>
        (x.live ? this.online : this.offline).push(x)
      );

      this.featuredStreamer = this.online
        .filter((x) => !!x.featuredRank)
        .sort((l, r) => l.featuredRank - r.featuredRank)[0];
      this.online.sort((l, r) => r.viewers - l.viewers);
    },

    async update(activeServerFilters) {
      var params = "?",
        activeServerFilters = this.activeServerFilters;
      if (activeServerFilters && typeof activeServerFilters === "object") {
        for (var filter in activeServerFilters) {
          if (activeServerFilters.hasOwnProperty(filter)) {
            if (activeServerFilters[filter]) {
              params += `&filter[${filter}]=${activeServerFilters[filter]}`;
            }
          }
        }
      }
      try {
        this.streamer_data = await this.$axios.$get(
          "https://lsn-api.dat.cloud/streams/" + params
        );
        this.filterStreamers();

        this.lastUpdated = new Date();
      } catch (e) {
        console.error(e);
      }
    },
  },
  async fetch() {
    // This will load nothing if team is invalid
    if (this.team) {
      this.activeServerFilters = {
        team: this.team.value,
      };
      await this.update();
    }
  },
};
</script>

<style scoped lang="scss">
.content {
  max-width: 600px;
}

.lastUpdated {
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
}
</style>