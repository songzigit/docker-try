<template>
  <div class="page">
    <div class="container">
      <span>back</span>
      <input type="text" v-model="keywords" class="content" />
    </div>
    <div class="content">
      <div>热搜榜</div>
      <ul>
        <li
          v-for="(item, index) in hotList"
          :key="index"
          class="hot-item ellipsis"
          @click="toPage"
          data-page="search-result"
        >
          {{ item.searchWord }}
        </li>
      </ul>
    </div>
    <MiniPlayer></MiniPlayer>
  </div>
</template>
<style lang="scss" scoped>
.hot-item {
  display: inline-block;
  width: 50%;
}
</style>
<script>
import MiniPlayer from "@/components/MiniPlayer";
import axios from "axios";
import api from "@/api";
export default {
  components: { MiniPlayer },
  data() {
    return {
      keywords: "", // 搜索关键词
      hotList: "", // 热门搜索列表
    };
  },
  created() {
    this.getHotSearch();
  },
  methods: {
    /**
     * 热搜榜
     */
    getHotSearch() {
      axios.get(api.hotSearch).then(({ status, data }) => {
        if (status === 200) {
          this.hotList = data.data || [];
        }
      });
    },
    toPage(e) {
      const { page } = e.currentTarget.dataset;
      const keywords = e.currentTarget.innerText;
      this.$router.push({ name: page, query: { keywords } });
    },
  },
};
</script>
