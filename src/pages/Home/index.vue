<template>
  <div class="page">
    <Header />
    <MusicPlayer />
    <Drawer />
    <router-view class="content"></router-view>
    <MiniPlayer />
    <ul class="nav" @click="switchPage">
      <li data-to="discovery" class="nav-item">发现</li>
      <li data-to="podcast" class="nav-item">播客</li>
      <li data-to="mine" class="nav-item">我的</li>
      <li data-to="k-song" class="nav-item">K歌</li>
      <li data-to="cloud-village" class="nav-item">云村2</li>
    </ul>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Drawer from "@/components/Drawer";
import MiniPlayer from "@/components/MiniPlayer";
import MusicPlayer from '@/pages/MusicPlayer';
export default {
  components: { Header, Drawer, MiniPlayer, MusicPlayer },
  methods: {
    switchPage(e) {
      const to = e.target.dataset.to;
      if (to !== this.$route.name) {
        this.$router.push(to);
      }
    },
  },
};
</script>
<style lang="scss">
.nav {
  display: flex;
  list-style: none;
  .nav-item {
    flex: 1;
    padding: 10px 0;
    text-align: center;
  }
}
</style>
