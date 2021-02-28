<template>
  <div class="pop-up" @click="clkBg">
    <div class="content bottom">
      <div
        v-for="(item, index) in playList"
        :key="index"
        @click="clkItem"
        class="song-item"
        :data-id="item.id"
      >
        <span class="song-name">{{ item.name }}</span>
        <span class="song-singer">{{ item.singer }}</span>
        <span class="fr del">删除</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.song-item {
  padding: 10px;
}
.song-name {
  font-size: 18px;
}
.song-singer {
  font-size: 16px;
  color: #666;
}
</style>
<script>
import axios from "axios";
import api from "@/api";

import { mapMutations } from "vuex";

export default {
  created() {
    this.getHistory();
  },
  unmounted() {
    this.updateHistory();
  },
  data() {
    return {
      playList: [], // 播放历史列表
    };
  },
  methods: {
    ...mapMutations(["setSong"]),
    /**
     * 点击播放历史弹窗背景
     */
    clkBg(e) {
      if (e.target.classList.contains("pop-up")) {
        this.$emit("hidePlayList");
      }
    },
    /**
     * 点击播放历史列表项
     */
    clkItem(e) {
      this.$emit("hidePlayList");
      const { id } = e.currentTarget.dataset;
      if (e.target.classList.contains("del")) {
        this.player.deleteHistory(id);
        return;
      }
      this.setSong(id);
    },
    /**
     * 获取播放历史列表
     */
    getHistory() {
      const history = this.player.getHistory();
      if (history) {
        this.getDetails(history);
      }
    },
    /**
     * 获取歌曲详情
     */
    getDetails(ids = "") {
      axios
        .get(api.songDetail, {
          params: {
            ids: ids,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const { songs } = data;
            songs &&
              songs.forEach((song) => {
                const { ar = [] } = song;
                this.playList.push({
                  id: song.id,
                  name: song.name,
                  singer: ar[0] && ar[0].name,
                });
              });
          }
        });
    },
  },
};
</script>
