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
  // 必选参数 : keywords : 关键词
  // 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
  // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
  search: '/search',
  // 邮箱登录
  emailLogin: '/login',
  // 推荐歌单
  recommendList: '/personalized',
  // 歌单详情
  // 必选参数 : id : 歌单 id
  // 可选参数 : s : 歌单最近的 s 个收藏者,默认为8
  albumDetail: '/playlist/detail',
  // 歌曲评论
  // 必选参数 : id: 音乐 id
  // 可选参数 :
  // limit: 取出评论数量 , 默认为 20
  // offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
  // before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
  musicComments: '/comment/music'
};

Object.keys(api).forEach(key => {
  api[key] = '/api' + api[key];
});

module.exports = api;
