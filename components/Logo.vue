<template>
  <v-container tag="div">
    <NuxtLink to="/" style="text-decoration: none; color: inherit;"><span :style="lsn">LiveStreamNorge</span></NuxtLink>
  </v-container>
</template>

<script>
export default {
  name: "Logo",
  props: {
    scale: {
      type: Number,
      default: 1.4,
      required: false,
    },
  },
  computed: {
    lsn() {
      return `
          color: #ff2fea;
          font-family: 'Bebas Neue', cursive;
          font-size: calc(24pt * ${this.scale});
          font-weight: 700;
          letter-spacing: 0.1em;
          line-height: 1.2;
          text-transform: uppercase;
        `;
    },
  }
}
</script>

<style scoped lang="scss">
  //@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Playfair+Display&display=swap');
</style>
