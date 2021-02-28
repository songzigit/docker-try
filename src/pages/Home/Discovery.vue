<template>
  <div class="container flex-col">
    <div class="container search">
      <span>侧边栏</span>
      <div class="content" @click="toPage" data-page="search">
        <span>placeholder</span>
      </div>
      <span>识曲</span>
    </div>
    <div class="content">
      <h1 @click="toPage" data-page="daily-recommend">每日推荐</h1>
      <section>
        <div>
          <span class="header">推荐歌单</span>
          <span class="fr" data-page="album-square" @click="toPage">更多</span>
        </div>
        <ul class="d-list fullw none-scrollbar">
          <li
            v-for="(item, index) in recommendList"
            :key="index"
            class="cover-con"
            :data-id="item.id"
            @click="toPage"
            data-page="album-detail"
          >
            <div class="cover">
              <img :src="item.picUrl" :alt="item.copywriter" />
              <span class="cnt">{{ item.playCount }}</span>
            </div>
            <div>
              {{ item.name }}
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search {
  line-height: 50px;
}
.header {
  font-weight: 600;
  font-size: 20px;
  color: #000;
}
.cover-con {
  margin: 5px;
  .cover {
    position: relative;
    width: 140px;
    height: 140px;
    overflow: hidden;
    border-radius: 8px;
    img {
      width: 100%;
    }
    .cnt {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #fff;
    }
  }
}
</style>
<script>
import axios from "axios";
import api from "@/api";

export default {
  data() {
    return {
      recommendList: [], // 推荐歌单
    };
  },
  created() {
    this.initData();
  },
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      this.getRecommendList();
    },
    /**
     * 推荐歌单
     */
    getRecommendList() {
      axios
        .get(api.recommendList, {
          params: {
            limit: 6,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const { result = [] } = data;
            this.recommendList = result;
          }
        });
    },
    toPage(e) {
      const { page, id } = e.currentTarget.dataset;
      console.log(page)
      let query = {};
      if (page === "album-detail") {
        query = { id };
      }
      this.$router.push({ name: page, query });
    },
  },
};
</script>
