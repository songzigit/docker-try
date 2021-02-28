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
      Vue.prototype.player = this.$refs.player;
    });
  },
  components: { Player },
};
</script>
