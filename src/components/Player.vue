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
      history: "", // 存在 localStorage 的播放历史列表
    };
  },
  computed: {
    ...mapState(["playing", "songId"]),
    historyList() {
      return this.history ? this.history.split(",") : [];
    },
  },
  created() {
    this.initData();
    this.$nextTick(function () {
      // 获取播放控件
      this.audio = this.$refs.audio;
    });
  },
  watch: {
    songId: function (val) {
      this.initData();
      this.addHistory(val);
    },
  },
  methods: {
    ...mapMutations(["startPlayer", "stopPlayer"]),

    /**
     * 初始化数据
     */
    initData() {
      if (this.songId) {
        this.getSongUrl().then(() => {
          this.startPlaying();
        });
        this.history = this.getHistory();
      }
    },

    /**
     * 获取播放历史
     */
    getHistory() {
      return localStorage.getItem(localKey.player_history) || "";
    },

    /**
     * 更新播放历史
     */
    updateHistory() {
      localStorage.setItem(localKey.player_history, this.historyList);
      this.history = this.getHistory();
    },

    /**
     * 添加播放历史
     */
    addHistory(id) {
      if (this.history.includes(id)) {
        this.deleteHistory(id);
      }
      this.historyList.unshift(id);
      this.updateHistory();
    },
    /**
     * 删除播放历史
     */
    deleteHistory(id) {
      this.historyList.forEach((el, index) => {
        if (el === String(id)) {
          this.historyList.splice(index, 1);
        }
      });
      this.updateHistory();
    },
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
