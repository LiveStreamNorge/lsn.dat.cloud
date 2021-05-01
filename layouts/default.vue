<template>
  <v-app>
    <v-app-bar
      fixed
      app
      hide-on-scroll
      height="50px"
      elevation="10"
    >
      <v-spacer />
      <v-toolbar-title>
        <logo />
      </v-toolbar-title>
      <v-spacer />
      <v-icon
           style="height: 170%; width: auto; position: fixed; right: 10px"
           class="py-1"
           @click="scroll()">mdi-arrow-up</v-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt @updated="u => this.lastUpdated = u" />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} LiveStreamNorge</span>
      <v-chip pill outlined small color="blue" class="ml-2">
        <v-icon small left>mdi-scale-balance</v-icon> AGPLv3.0
      </v-chip>
      <v-chip pill outlined small color="green" class="ml-2" href="https://github.com/LiveStreamNorge/lsn.dat.cloud">
        <v-icon small left>mdi-open-in-new</v-icon> source code
      </v-chip>
    </v-footer>
  </v-app>
</template>

<script>
import Logo from "@/components/Logo";
import RandomQuote from "../components/RandomQuote";
export default {
  components: {RandomQuote, Logo},
  data () {
    return {
      fixed: false,
      lastUpdated: null,
    }
  },

  methods: {
    scroll() {
      window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }
  }

}
</script>

<style lang="scss">
</style>
