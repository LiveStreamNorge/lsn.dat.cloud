<template>
  <v-container fluid tag="div">
    <link rel="prefetch" href="https://lsn-api.dat.cloud/streams" />

    <v-row justify="center">
      <v-col class="mt-n5 content" tag="v-card">
        <stream-filter class="mt-n1 mb-n1" @filter-changed="filterChanged" />
        <v-container tag="div" class="mt-3">
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

          <random-quote class="ma-0 pa-0 mt-4" />
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
import StreamListGroup from '~/components/StreamListGroup';
import StreamerEntry from "../components/StreamerEntry";
import FeaturedStreamer from "../components/FeaturedStreamer";
import StreamListGroupSkeleton from "../components/StreamListGroupSkeleton";
import StreamListHeader from "../components/StreamListHeader";
import RandomQuote from "../components/RandomQuote";

export default {
  components: {
    RandomQuote,
    StreamListGroupSkeleton,
    FeaturedStreamer,
    StreamerEntry,
    StreamListHeader,
    StreamListGroup
  },

  data() {
    return {
      streamer_data: [],
      lastUpdated: null,

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

      this.streamer_data.forEach(x =>
          (x.live ? this.online : this.offline).push(x)
      );

      this.featuredStreamer = this.online.filter(x => !!x.featuredRank)
          .sort((l, r) => l.featuredRank - r.featuredRank)[0];
      this.online.sort((l, r) => r.viewers - l.viewers);
    },

    async update(activeServerFilters) {
      var params = "?";
      if(activeServerFilters && typeof activeServerFilters === "object"){
        for(var filter in activeServerFilters){
          if(activeServerFilters.hasOwnProperty(filter)){
            if(activeServerFilters[filter]){
              params += `&filter[${filter}]=${activeServerFilters[filter]}`;
            }
          }
        }
      }
      try {
        this.streamer_data = await this.$axios.$get('https://lsn-api.dat.cloud/streams/' + params);
        this.filterStreamers();

        this.lastUpdated = new Date();

      } catch (e) {
        console.error(e);
      }
    },
    filterChanged: async function filterChanged(activeFilters) {
      await this.update(Object.assign([], activeFilters));
    }
  },

  async fetch() {
    await this.update();
  },
}
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
