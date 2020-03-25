// pages/me/me.js
Page({
  data: {
    AvatarUrl: '/images/me/avademo.png',
    username: '加载中',
    score: 0,
    logthree: []
  },
  onLoad: function (options) {
    this.setData({
      AvatarUrl: "/images/me/testava.jpg",
      score: 100,
      logthree: [{'date':'2.30','proj':'步行10公里','change':'+10'},{'date':'3.32','proj':'长跑5公里','change':'+15'},{'date':'4.31','proj':'步行10公里','change':'+10'}]
    })
  },
})