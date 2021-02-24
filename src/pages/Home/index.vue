<template>
  <div class="page">
    <router-view class="content"></router-view>
    <MiniPlayer></MiniPlayer>
    <ul class="bottom-nav list" @click="navPage">
      <li class="list-item" data-page="discovery">发现</li>
      <li class="list-item" data-page="podcast">播客</li>
      <li class="list-item" data-page="mine">我的</li>
      <li class="list-item" data-page="ksong">K歌</li>
      <li class="list-item" data-page="cloud-village">云村</li>
    </ul>
  </div>
</template>
<script>
import MiniPlayer from "@/components/MiniPlayer";
export default {
  components: { MiniPlayer },
  methods: {
    navPage(e) {
      const { page } = e.target.dataset;
      this.$router.push(page);
    },
  },
};
</script>
<style lang="scss" scoped>
.bottom-nav {
  height: 50px;
}
</style>

