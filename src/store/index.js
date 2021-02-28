import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  showDrawer: false,
  playing: false, // 是否播放中
  login: false, // 是否登录
  songId: null // 当前播放的歌曲 id
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
  }
};
const store = new Vuex.Store({
  state,
  mutations
});

export default store;
