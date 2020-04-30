// pages/me/me.js
Page({
  data: {
    AvatarUrl: 'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/avademo.png?sign=032b26657afd1c64dd19a5798feab256&t=1588086418',
    username: '加载中',
    score: 0,
    logthree: []
  },
  onLoad: function (options) {
    this.setData({
      AvatarUrl: "https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/testava.jpg?sign=6fdab6348eeeeecc9ae14d7c992abb03&t=1588086430",
      score: 100,
      logthree: [{'date':'2.30','proj':'步行10公里','change':'+10'},{'date':'3.32','proj':'长跑5公里','change':'+15'},{'date':'4.31','proj':'步行10公里','change':'+10'}]
    })
  },
})