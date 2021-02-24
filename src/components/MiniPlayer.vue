<template>
  <div class="mini-player" @click="showPlayer">mini-player</div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["showPlayer"]),
  },
};
</script>
<style lang="scss">
.mini-player {
  line-height: 30px;
  background-color: rebeccapurple;
}
</style>
