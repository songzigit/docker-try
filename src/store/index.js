import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  showDrawer: false,
  playing: false, // 是否播放中
  login: false, // 是否登录
  songId: null, // 当前播放的歌曲 id
  progress: 0, // 音乐播放进度
  volume: 0.5, // 音量大小
  duration: 0 // 音乐时长
};

const mutations = {
  openDrawer(state) {
    state.showDrawer = true;
  },
  closeDrawer(state) {
    state.showDrawer = false;
  },
  startPlayer(state) {
    state.playing = true;
  },
  stopPlayer(state) {
    state.playing = false;
  },
  setSong(state, id) {
    state.songId = id;
  },
  setPlayerProgress(state, val) {
    state.progress = val;
  },
  setPlayerVolume(state, val) {
    state.volume = val;
  },
  setDuration(state, val) {
    state.duration = val;
  }
};
const store = new Vuex.Store({
  state,
  mutations
});

export default store;
