<template>
  <div class="page black-bg">
    <video :src="videoUrl" controls class="fullw video" ref="video"></video>
  </div>
</template>
<style lang="scss" scoped>
.video {
  position: relative;
  top: 50%;
  margin-top: -50%;
}
</style>
<script>
import axios from "axios";
import api from "@/api";
export default {
  data() {
    return {
      id: "", // 视频 id
      videoUrl: "", // 视频播放地址
    };
  },
  created() {
    const { id } = this.$route.query;
    // 停止播放歌曲
    this.player.stopPlaying();
    if (id) {
      this.id = id;
      this.getVideoUrl().then(this.playVideo);
    }
    this.$nextTick(function () {
      this.video = this.$refs.video;
    });
  },
  methods: {
    /**
     * 获取视频播放地址
     */
    getVideoUrl() {
      return new Promise((resolve) => {
        axios
          .get(api.videoUrl, {
            params: {
              id: this.id,
            },
          })
          .then(({ status, data }) => {
            if (status === 200) {
              const { urls = [] } = data;
              if (urls.length) {
                this.videoUrl = urls[0].url;
                resolve();
              }
            }
          });
      });
    },

    /**
     * 播放视频
     */
    playVideo() {
      if (this.video) {
        this.videoUrl && this.video.play();
      }
    },
  },
};
</script>
