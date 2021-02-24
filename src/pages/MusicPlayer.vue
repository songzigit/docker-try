<template>
  <div v-show="showPlayer" class="page player">MusicPlayer</div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["showPlayer"]),
  },
};
</script>
<style lang="scss">
.player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
