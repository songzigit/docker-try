<template>
  <div class="header">
    <span class="fl" @click="openDrawer">打开</span>
    <span>{{ songName }}</span>
    <span class="fr">分享</span>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      songName: "一路向北",
    };
  },
  methods: {
    ...mapMutations(["openDrawer"]),
  },
};
</script>
<style lang="scss">
.header {
  line-height: 40px;
  text-align: center;
}
</style>
