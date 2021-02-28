<template>
  <div>
    <h1>Comments</h1>
    <ul>
      <li v-for="(item, index) in comments" :key="index" class="comment-item">
        <div v-if="item.user" class="container">
          <img :src="item.user.avatarUrl" alt="" class="avatar" />
          <div class="c-content">
            <div class="pos-rel">
              <div>{{ item.user.nickname }}</div>
              <div>{{ item.time }}</div>
              <span class="c-favor">👍</span>
            </div>
            <div class="comment">{{ item.content }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.comment-item {
  margin: 10px;
  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
  }
  .c-content {
    flex: 1;
  }
  .c-favor {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .comment {
    margin-top: 10px;
  }
}
</style>
<script>
import axios from "axios";
import api from "@/api";
export default {
  data() {
    return {
      songId: "", // 歌曲 id
      comments: [], // 评论列表
    };
  },
  created() {
    const { songId } = this.$route.query;
    if (songId) {
      this.songId = songId;
      this.getComments();
    }
  },
  methods: {
    /**
     * 获取歌曲评论
     */
    getComments() {
      axios
        .get(api.musicComments, {
          params: {
            id: this.songId,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const { comments = [], hotComments = [] } = data;
            this.comments = comments;
            console.log(hotComments);
          }
        });
    },
  },
};
</script>
