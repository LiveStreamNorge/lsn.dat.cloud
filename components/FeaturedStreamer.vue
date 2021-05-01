<template>

  <v-container fluid style="padding: 0">

    <stream-list-header class="mt-auto" :divider-title="$t('featured')"/>

    <streamer-entry :data="streamer" :live="streamer.live" :unread="true" class="my-5 featured">
      <div v-for="i in 3" v-bind:key="i" class="ring-animation" :style="`animation-delay: ${0.15 * i}s;`"/>
    </streamer-entry>

  </v-container>

</template>

<script>
import StreamListHeader from "./StreamListHeader";
import StreamerEntry from "./StreamerEntry";
export default {
  components: {StreamListHeader, StreamerEntry},
  name: "FeaturedStreamer",
  props: ["streamer"]
}
</script>

<style scoped lang="scss">

  .ring-animation {
    border: solid #ff2fea 1px;
    border-radius: 3px;

    z-index: 10;

    position: absolute;

    width: 100%;
    height: 100%;

    opacity: 0;
  }

  .featured {
    &:not(:hover) > .ring-animation {
      animation: ring-out 2s ease-in-out 0s infinite normal forwards;
    }
    &:hover > .ring-animation {
      animation: fade-in 100ms ease-in-out 0s 1 normal forwards;
    }
  }

  @keyframes fade-in {
    to, from { border-color: #777 }
    to { opacity: 1 }
  }

  @keyframes ring-out {
    from, to, 5% {
      transform: scale(1);
      opacity: 1;
    }

    25%, 80% {
      opacity: 0;
      transform: scaleX(1.1) scaleY(1.5);
    }

    80% {
      transform: scale(1);
    }
  }
</style>
