<template>
  <div class="page">
    <div class="header">
      <div class="back" @click="back">back</div>
    </div>
    <div class="content" @click="switchContent">
      <div class="album-cover" v-show="!showLyric">这是封面</div>
      <div class="lyric" v-show="showLyric">
        <div class="progress-bar">
          dsfdsf
          <Progress percent=""></Progress>
        </div>
        这是歌词
      </div>
    </div>
    <div class="play-bar">
      <div class="progress-bar">
        <span>04:00</span>
        <div class="progress"></div>
        <span>04:10</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  height: 45px;
}
.lyric {
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
</style>
<script>
import Progress from "@/components/Progress";
import axios from "axios";
import api from "@/api";
export default {
  components: { Progress },
  data() {
    return {
      lyricList: [],
      showLyric: false, // 是否显示歌词
    };
  },
  created() {
    this.getLyric();
  },
  methods: {
    getLyric() {
      console.log(api);
      console.log(api.songDetail);
      axios
        .get(api.songDetail, {
          params: {
            ids: 347230,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    /**
     * 切换显示内容
     */
    switchContent() {
      this.showLyric = !this.showLyric;
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
