const api = {
  // 歌曲详情
  songDetail: '/song/detail',
  // 获取歌词
  lyric: '/lyric',
  // 获取播放地址
  songUrl: '/song/url',
  // 每日推荐歌曲
  dailyRecommend: '/recommend/songs',
  // 热门搜索
  hotSearch: '/search/hot/detail',
  // 搜索
  search: '/search/suggest',
  // 邮箱登录
  emailLogin: '/login',
  // 推荐歌单
  recommendList: '/personalized',
  // 歌单详情
  // 必选参数 : id : 歌单 id
  // 可选参数 : s : 歌单最近的 s 个收藏者,默认为8
  albumDetail: '/playlist/detail'
};

Object.keys(api).forEach(key => {
  api[key] = '/api' + api[key];
});

module.exports = api;
