import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  showDrawer: false,
  playing: false, // 是否播放中
  login: false, // 是否登录
  showPlayer: false // 是否显示播放器
};

const mutations = {
  openDrawer(state) {
    state.showDrawer = true;
  },
  closeDrawer(state) {
    state.showDrawer = false;
  },
  showPlayer() {
    state.showPlayer = true;
  },
  hidePlayer() {
    state.showPlayer = false;
  }
};
const store = new Vuex.Store({
  state,
  mutations
});

export default store;