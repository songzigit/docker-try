<template>
  <div>
    <div>
      {{ detail.description }}
    </div>
    <ul class="d-list flex-col" v-if="detail.tracks">
      <li
        v-for="(item, index) in detail.tracks"
        :key="index"
        class="d-list flex-row list-item"
        :data-id="item.id"
        @click="toDetail"
      >
        <div>{{ index + 1 }}</div>
        <img :src="item.al.picUrl" :alt="item.al.name" class="cover" />
        <div>
          <div>
            <span>{{ item.name }}</span>
            <span v-if="item.ar">{{ item.ar[0].name }}</span>
          </div>
          <div></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.list-item {
  margin: 6px 10px;
  .cover {
    width: 60px;
    height: 40px;
    border-radius: 4px;
    margin: 0 4px;
  }
}
</style>
<script>
import axios from "axios";
import api from "@/api";

export default {
  data() {
    return {
      id: "", // 歌单 id
      detail: {}, // 歌曲列表
    };
  },
  created() {
    const id = this.$route.query.id;
    this.id = id;
    this.getDetail();
  },
  methods: {
    /**
     * 歌单详情
     */
    getDetail() {
      axios
        .get(api.albumDetail, {
          params: {
            id: this.id,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const { playlist = {} } = data;
            this.detail = playlist;
          }
        });
    },
    /**
     * 去歌曲详情页
     */
    toDetail(e) {
      const { id } = e.currentTarget.dataset;
      this.$router.push({ name: "main-player", query: { id } });
    },
  },
};
</script>
