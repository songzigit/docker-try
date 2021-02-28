<template>
  <div class="page">
    <div class="header">
      <div class="fl" @click="back">back</div>
      <div>{{ songName }}</div>
    </div>
    <div class="content" @click="switchContent">
      <div v-show="!showLyric" class="album">
        <img :src="albumCover" alt="封面" class="album-cover" />
      </div>
      <div class="list flex-col" v-show="showLyric">
        <div class="progress-bar">
          dsfdsf
          <Progress percent=""></Progress>
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
        <span>04:00</span>
        <div class="progress"></div>
        <span>04:10</span>
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
.progress {
  flex: 1;
  height: 1px;
  background-color: red;
}
.album {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .album-cover {
    width: 300px;
    border-radius: 50%;
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
    ...mapState(["songId"]),
  },
  watch: {
    songId: "initData",
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
            const lyricList = lyric.split("\n");
            lyricList.forEach((line) => {
              const reg = /(\[.+\]\s*)(.+)/;
              const result = line.match(reg) || [];
              if (result) {
                result[2] && this.lyricList.push(result[2]);
              }
            });
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
  },
};
</script>
