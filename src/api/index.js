const api = {
  songDetail: '/song/detail',
  lyric: '/lyric',
  songUrl: '/song/url',
  dailyRecommend: '/recommend/songs',
  hotSearch: '/search/hot/detail',
  search: '/search/suggest'
};

Object.keys(api).forEach(key => {
  api[key] = '/api' + api[key];
});

module.exports = api;
