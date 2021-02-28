<template>
  <div class="page">
    <div class="container">
      <input type="text" v-model="keywords" class="content" />
    </div>
    <ul class="d-list none-scrollbar">
      <li
        v-for="(item, index) in tabs"
        :data-tab="item.code"
        :data-id="index"
        :key="index"
        @click="switchTab"
        class="tab-item"
        :class="{ selected: cur === index }"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="content">
      <ul>
        <!-- 单曲 start -->
        <li
          v-for="(item, index) in result.songs"
          :key="index"
          class="l-item"
          @click="toPage"
          data-page="main-player"
          :data-id="item.id"
        >
          <div>
            <span class="song-name" v-if="item.name">{{ item.name }}</span>
            <span class="sub-name" v-if="item.transNames">
              {{ item.transNames[0] }}
            </span>
          </div>
          <div>
            <span v-if="item.artists">{{ item.artists[0].name }}</span>
            <span v-if="item.album">{{ item.album.name }}</span>
          </div>
        </li>
        <!-- 单曲 end -->
        <!-- 歌单 start -->
        <li
          v-for="(item, index) in result.playlists"
          :key="index"
          class="l-item"
          @click="toPage"
          data-page="album-detail"
          :data-id="item.id"
        >
          <div class="container">
            <img :src="item.coverImgUrl" alt="" class="album-cover" />
          </div>
        </li>
        <!-- 歌单 end -->
        <!-- 歌手 start -->
        <li
          v-for="(item, index) in result.artists"
          :key="index"
          class="l-item"
          @click="toPage"
          data-page="user-home"
          :data-id="item.id"
        >
          <div class="container">
            <img :src="item.picUrl" alt="" class="album-cover" />
            <div class="content">
              <span v-if="item.name">{{ item.name }}</span>
              <span v-if="item.trans">({{ item.trans }})</span>
            </div>
          </div>
        </li>
        <!-- 歌手 end -->
        <!-- 用户 start -->
        <li
          v-for="(item, index) in result.userprofiles"
          :key="index"
          class="l-item"
          @click="toPage"
          data-page="user-home"
          :data-id="item.id"
        >
          <div class="container user">
            <img :src="item.avatarUrl" alt="" class="avatar-cover" />
            <div class="content" v-if="item.nickname">
              {{ item.nickname }}
            </div>
            <button v-if="!item.followed" class="follow-btn">+ 关注</button>
          </div>
        </li>
        <!-- 用户 end -->
        <!-- 专辑 start -->
        <li
          v-for="(item, index) in result.albums"
          :key="index"
          class="l-item"
          @click="toPage"
          data-page="album-detail"
          :data-id="item.id"
        >
          <div class="container">
            <img :src="item.picUrl" alt="" class="album-cover" />
            <div class="content">
              <div>
                <span v-if="item.name">{{ item.name }}</span>
              </div>
              <div>
                <span v-if="item.artist">{{ item.artist.name }}</span>
                <span v-if="item.containedSong">
                  包含单曲{{ item.containedSong }}
                </span>
              </div>
            </div>
          </div>
        </li>
        <!-- 专辑 end -->
        <!-- 视频 start -->
        <li
          v-for="(item, index) in result.videos"
          :key="index"
          class="l-item video-cover"
          @click="toPage"
          data-page="album-detail"
          :data-id="item.id"
        >
          <div class="container flex-col">
            <img :src="item.coverUrl" alt="" />
            <div>
              {{ item.title }}
            </div>
          </div>
        </li>
        <!-- 视频 end -->
      </ul>
    </div>
    <MiniPlayer></MiniPlayer>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/varibles";
.tab-item {
  margin: 10px 20px;
  white-space: nowrap;
}
.selected {
  border-bottom: solid 1px $main-color;
}
.l-item {
  padding: 10px;
}
.album-cover {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}
.avatar-cover {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.follow-btn {
  color: $main-color;
  background-color: #fff;
  border: solid 1px $main-color;
  border-radius: 16px;
  padding: 4px 10px;
}
.user {
  align-items: center;
}
.video-cover {
  width: 50%;
  padding: 5px;
  display: inline-block;
  box-sizing: border-box;
}
</style>
<script>
import MiniPlayer from "@/components/MiniPlayer";
import axios from "axios";
import api from "@/api";
export default {
  components: { MiniPlayer },
  data() {
    return {
      tabs: [
        {
          name: "综合",
          code: 1018,
        },
        {
          name: "单曲",
          code: 1,
        },
        {
          name: "歌单",
          code: 1000,
        },
        {
          name: "视频",
          code: 1014,
        },
        {
          name: "专辑",
          code: 10,
        },
        {
          name: "歌手",
          code: 100,
        },
        {
          name: "用户",
          code: 1002,
        },
        {
          name: "MV",
          code: 1004,
        },
        {
          name: "歌词",
          code: 1006,
        },
        {
          name: "电台",
          code: 1009,
        },
      ],
      cur: 1, // 当前选中的 tab 下标
      result: {},
    };
  },
  created() {
    const { keywords } = this.$route.query;
    if (keywords) {
      this.keywords = keywords;
      this.search();
    }
  },
  methods: {
    /**
     * 搜索结果
     * type 可选
     */
    search(type) {
      axios
        .get(api.search, {
          params: {
            keywords: this.keywords,
            type: type,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            const { result = {} } = data;
            this.result = result;
          }
        });
    },
    /**
     * 切换 tab 结果
     */
    switchTab(e) {
      const { tab, id } = e.currentTarget.dataset;
      this.cur = +id;
      this.search(tab);
    },
    /**
     * 跳转指定页面
     */
    toPage(e) {
      const { page, id } = e.currentTarget.dataset;
      this.$router.push({ name: page, query: { id } });
    },
  },
};
</script>
