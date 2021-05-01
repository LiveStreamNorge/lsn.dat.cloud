<template>

  <v-container fluid style="padding: 0">

    <stream-list-header class="gold mt-auto" :divider-title="$t('featured')"/>

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

.gold {
  background: linear-gradient(90deg, rgba(186,148,62,1) 0%, rgba(236,172,32,1) 20%, rgba(186,148,62,1) 39%, rgba(249,244,180,1) 50%, rgba(186,148,62,1) 60%, rgba(236,172,32,1) 80%, rgba(186,148,62,1) 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;	
  animation: shine 6s ease-in-out 0s infinite alternate;
  background-size: 200%;
  background-position: left;

}
@keyframes shine {
  to{background-position: right}
 
}
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
