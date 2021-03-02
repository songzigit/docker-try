<template>
  <div class="page">
    <div class="header">
      <div class="fl" @click="back">back</div>
      <div>{{ songName }}</div>
    </div>
    <div class="content" @click="switchContent">
      <div v-show="!showLyric" class="album flex-col">
        <img :src="albumCover" alt="封面" class="album-cover" />
        <div @click.stop="userOp" class="user-btns">
          <span data-act="favor" class="btn">喜爱</span>
          <span data-act="download" class="btn">下载</span>
          <span data-act="comments" class="btn">评论</span>
        </div>
      </div>
      <div class="list flex-col" v-show="showLyric">
        <div class="progress-bar">
          <span>图标</span>
          <Progress percent="1" @progressChange="volumeChange"></Progress>
        </div>
        <div class="constrained">
          <div v-for="(lyric, index) in lyricList" :key="index">
            {{ lyric }}
          </div>
        </div>
      </div>
    </div>
    <div class="play-bar">
      <div class="progress-bar">
        <span>{{ curTimeStr }}</span>
        <Progress
          :percent="progress"
          @progressChange="progressChange"
        ></Progress>
        <span>{{ durationStr }}</span>
      </div>
      <div class="list play-menu">
        <div>上一首</div>
        <div @click="togglePlaying">播放</div>
        <div>下一首</div>
        <div @click="showHistory">列表</div>
      </div>
    </div>
    <PlayList v-if="showPlayList" @hidePlayList="hideHistory" />
  </div>
</template>
<style lang="scss" scoped>
.header {
  height: 45px;
  text-align: center;
}
.progress-bar {
  display: flex;
  align-items: center;
}
.album {
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .album-cover {
    width: 300px;
    border-radius: 50%;
  }
  .user-btns {
    position: absolute;
    bottom: 0;
    .btn {
      padding: 10px 20px;
    }
  }
}
.play-menu {
  height: 50px;
}
</style>
<script>
import Progress from "@/components/Progress";
import PlayList from "@/pages/MainPlayer/PlayList";
import axios from "axios";
import api from "@/api";

import { mapState, mapMutations } from "vuex";

export default {
  components: { Progress, PlayList },
  data() {
    return {
      lyricList: [],
      showLyric: false, // 是否显示歌词
      songName: "歌曲", // 歌曲名称
      albumCover: "", // 封面地址
      showPlayList: false, // 是否显示播放列表
    };
  },
  computed: {
    ...mapState(["songId", "duration", "progress", "volume"]),
    curTimeStr() {
      return this.formatTime(this.duration * this.progress);
    },
    durationStr() {
      return this.formatTime(this.duration);
    },
  },
  watch: {
    songId: function (val, oldVal) {
      if (oldVal) {
        // 修改页面参数，否则刷新后页面数据丢失
        this.$router.replace({
          query: { id: this.songId },
        });
        this.initData();
      }
    },
  },
  created() {
    const { id } = this.$route.query;
    if (this.songId || id) {
      id && this.setSong(id);
      this.initData();
    }
  },
  methods: {
    ...mapMutations(["setSong"]),
    /**
     * 页面数据初始化
     */
    initData() {
      this.getDetail();
      this.getLyric();
    },
    /**
     * 获取歌词
     */
    getLyric() {
      axios
        .get(api.lyric, {
          params: {
            id: this.songId,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const { lrc = {} } = data;
            const lyric = lrc.lyric || "";
            const lyricList = lyric ? lyric.split("\n") : [];
            if (lyricList.length) {
              lyricList.forEach((line) => {
                const reg = /(\[.+\]\s*)(.+)/;
                const result = line.match(reg) || [];
                if (result[2]) {
                  result[2] && this.lyricList.push(result[2]);
                }
              });
            } else {
              this.lyricList = [];
            }
          }
        });
    },
    /**
     * 获取歌词详情
     */
    getDetail() {
      axios
        .get(api.songDetail, {
          params: {
            ids: this.songId,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const { songs = [] } = data;
            const song = songs[0] || {};
            const { al = {} } = song;
            this.songName = song.name;
            this.albumCover = al.picUrl;
          }
        });
    },
    /**
     * 切换音乐播放状态
     */
    togglePlaying() {
      if (!this.player) {
        return;
      }
      this.player.togglePlaying();
    },
    /**
     * 展示播放历史列表
     */
    showHistory() {
      this.showPlayList = true;
    },
    /**
     * 隐藏播放历史列表
     */
    hideHistory() {
      this.showPlayList = false;
    },
    /**
     * 切换显示内容
     */
    switchContent() {
      this.showLyric = !this.showLyric;
    },
    /**
     * 返回上一页
     */
    back() {
      this.$router.go(-1);
    },
    /**
     * 用户点击底部的喜爱、下载、评论等按钮
     */
    userOp(e) {
      const { act } = e.target.dataset;
      switch (act) {
        case "comments":
          this.$router.push({
            name: "comments",
            query: { songId: this.songId },
          });
          break;
        default:
          break;
      }
    },

    /**
     * 播放进度改变
     */
    progressChange(val) {
      this.player.setProgress(val);
    },
    /**
     * 播放音量改变
     */
    volumeChange(val) {
      this.player.setVolume(val);
    },
    /**
     * 时间格式化
     */
    formatTime(seconds) {
      const s = Math.floor(seconds % 60);
      const m = Math.floor((seconds / 60) % 60);
      return `${this.padStr(String(m))}:${this.padStr(String(s))}`;
    },
    /**
     * 字符串前用0补齐
     */
    padStr(str = "", len = 2) {
      let res = str;
      if (str.length < len) {
        for (let i = str.length; i < len; i++) {
          res = "0" + res;
        }
      }
      return res;
    },
  },
};
</script>
