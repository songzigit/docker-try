<template>
  <div>
    <router-view></router-view>
    <Player hidden ref="player" />
  </div>
</template>
<script>
import Player from "@/components/Player";
import Vue from "vue";
export default {
  created() {
    this.$nextTick(function () {
      const player = this.$refs.player;
      Vue.prototype.player = player;
    });
    console.log(document.cookie);
  },
  components: { Player },
};
</script>
