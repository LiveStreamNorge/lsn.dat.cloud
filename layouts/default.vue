<template>
  <v-app>
    <link href='https://fonts.googleapis.com/css2?family=Raleway&family=Montserrat&family=Bebas Neue&display=swap'
          rel='stylesheet' type='text/css'>
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
           style="height: 100%; width: auto; position: fixed; right: 10px"
           class="py-1 arrow"
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
        <v-icon small left>mdi-open-in-new</v-icon> {{$t("sourceCode")}}
      </v-chip>
      <v-chip outlined small class="ml-2" href="/privacy">
        {{$t("privacyPolicy")}}
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
 .v-application {
   font-family: "Raleway", sans-serif !important;
      .title,
      .text-h1,
      .text-h2,
      .text-h3,
      .text-h4,
      .text-h5,
      .text-h6,
      .text-headline,
      .text-title,
      .text-subtitle-1,
      .text-subtitle-2,
      .text-body-1,
      .text-body-2,
      .text-button,
      .text-caption,
      .text-overline {
        font-family: "Raleway", sans-serif !important;
      }

 }
.v-app-bar--is-scrolled .arrow {
  top: 40px;
}
</style>
