<template>
  <div class="mini-player" @click="showPlayer">
    <span @click.stop="togglePlaying">播放</span>
  </div>
</template>
<style lang="scss" scoped>
.mini-player {
  background-color: rebeccapurple;
  height: 40px;
}
</style>
<script>
export default {
  methods: {
    showPlayer() {
      this.$router.push({ name: "main-player" });
    },
    /**
     * 切换播放状态
     */
    togglePlaying() {
      this.player.togglePlaying();
    },
  },
};
</script>
