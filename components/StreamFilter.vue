<template>
  <v-container fluid style="padding: 0">
    <stream-list-header
      header-styling="grey--text"
      class="mt-auto"
      :divider-title="$t('filter')"
    />

    <span class="subheading">Stream-team:</span>
    <v-chip-group v-model="teams" multiple column @change="emitFilterChanged">
      <v-chip
        filter
        outlined
        :key="team.value"
        :value="team.value"
        v-for="team in availableTeams"
      >
        <v-img
          width="32px"
          contain
          eager
          v-if="team.image"
          :alt="team.name"
          :title="team.name"
          :src="team.image"
        />
        <span v-if="!team.image">{{ team.name }}</span>
      </v-chip>
    </v-chip-group>
    <span class="subheading">Platform:</span>
    <v-chip-group
      v-model="platforms"
      multiple
      column
      @change="emitFilterChanged"
    >
      <div :key="platform.value" v-for="platform in availablePlatforms">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              filter
              outlined
              :value="platform.value"
              v-bind="attrs"
              v-on="on"
            >
              <v-img
                width="24px"
                contain
                eager
                :alt="platform.name"
                :title="platform.name"
                :src="platform.image"
              />
            </v-chip>
          </template>
          <span>{{ platform.name }}</span>
        </v-tooltip>
      </div>
    </v-chip-group>
  </v-container>
</template>

<script>
// We put initial state in a function
// This is so we can reset the data when clicking on "Reset filter"
function initialState() {
  return {
    teams: [],
    platforms: [],
    activeFilters: [],
  };
}
import { AVAILABLE_TEAMS } from "../utils/constants";
export default {
  data() {
    return initialState();
  },
  computed: {
    availableTeams() {
      return AVAILABLE_TEAMS;
    },
    availablePlatforms() {
      return [
        {
          name: "Twitch",
          value: "twitch",
          image: "/platforms/twitch.png",
        },
        {
          name: "Dlive",
          value: "dlive",
          image: "/platforms/dlive.png",
        },
        {
          name: "Youtube",
          value: "youtube",
          image: "/platforms/youtube.png",
        },
        {
          name: "Robotstreamer",
          value: "robotstreamer",
          image: "/platforms/robotstreamer.png",
        },
        {
          name: "Trovo",
          value: "trovo",
          image: "/platforms/trovo.png",
        },
        {
          name: "Guac",
          value: "guac",
          image: "/platforms/guac.png",
        },
        {
          name: "Kick",
          value: "kick",
          image: "/platforms/kick.svg",
        },
        {
          name: "TikTok",
          value: "tiktok",
          image: "/platforms/tiktok.svg",
        },
        {
          name: "Angelthump",
          value: "angelthump",
          image: "/platforms/angelthump.png",
        },
      ];
    },
  },
  name: "StreamFilter",
  methods: {
    emitFilterChanged: function emitFilterChanged() {
      if (this.teams) {
        this.activeFilters["team"] = this.teams.join(",");
      } else {
        delete this.activeFilters["team"];
      }

      if (this.platforms) {
        this.activeFilters["platform"] = this.platforms.join(",");
      } else {
        delete this.activeFilters["platform"];
      }
      // Emit a filter so that we can update the results
      this.$emit("filter-changed", this.activeFilters);
    },
    resetFilters: function resetFilters() {
      // Reset to default initialState
      Object.assign(this.$data, initialState());

      this.emitFilterChanged();
    },
  },
};
</script>

<style scoped lang="scss"></style>
