<template>
  <div>
    <audio :src="songUrl" ref="audio"></audio>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import axios from "axios";
import api from "@/api";
import localKey from "@/util/local_key";

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      songUrl: "", // 歌曲播放地址
      audio: null, // 音频播放元素
    };
  },
  computed: {
    ...mapState(["playing", "songId"]),
  },
  created() {
    this.getSongUrl();
    this.$nextTick(function () {
      // 获取播放控件
      this.audio = this.$refs.audio;
    });
    this.$obs.on(localKey.playSong, (id) => {
      id && (this.songId = id);
      this.stopPlaying();
    });
  },
  watch: {
    songId: function () {
      // id 改变重新加载数据并开始播放
      this.getSongUrl().then(this.startPlaying);
    },
  },
  methods: {
    ...mapMutations(["startPlayer", "stopPlayer"]),

    /**
     * 添加播放历史
     */
    addHistory(id) {},
    /**
     * 删除播放历史
     */
    deleteHistory(id) {},
    /**
     * 清空播放列表
     */
    deleteAll() {
      localStorage.removeItem(localKey.player_history);
    },
    /**
     * 获取音乐播放地址
     */
    getSongUrl() {
      return new Promise((resolve, reject) => {
        axios
          .get(api.songUrl, {
            params: {
              id: this.songId,
            },
          })
          .then(({ status, data }) => {
            if (status === 200) {
              const songs = data.data || [];
              const song = songs[0] || {};
              const url = song.url;
              if (url) {
                this.songUrl = url;
                resolve();
              } else {
                reject();
              }
            }
          });
      });
    },
    /**
     * 开始播放
     */
    startPlaying() {
      if (this.audio) {
        this.songUrl && this.audio.play();
      }
    },
    /**
     * 停止播放
     */
    stopPlaying() {
      if (this.audio) {
        this.audio.pause();
      }
    },
    /**
     * 切换音乐播放状态
     */
    togglePlaying() {
      if (!this.audio) {
        return;
      }
      if (this.playing) {
        this.stopPlaying();
        this.stopPlayer();
      } else {
        this.startPlaying();
        this.startPlayer();
      }
    },
  },
};
</script>
