// pages/me/me.js
const db = wx.cloud.database()
const app = getApp()
const user_openid = app.appData.user_openid
Page({
  data: {
    AvatarUrl: 'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/avademo.png?sign=032b26657afd1c64dd19a5798feab256&t=1588086418',
    username: '加载中',
    score: 0,
    logthree: [],
    my_release:false,
    my_release_detail: [],
    touch_times:1,
    pop_detail: false,
  },

  release_hidden_change:function(e){
    var that = this
    var touch_times = that.data.touch_times
    that.setData({
      touch_times: touch_times + 1
    })
    if (that.data.touch_times % 2 == 0) {
      that.setData({
        my_release: true
      })


    } else {
      this.setData({
        my_release: false
      })
    }
  },
  match_detail: function (e) {
    this.setData({
      pop_detail: true
    })
    console.log('开启')
  },
  pop_fade2: function (e) {
    var that = this
    setTimeout(function () {
      that.setData({
        pop_detail: false
      })
    }, 100)
    console.log('关闭')
  },



  onLoad: function (options) {
    var that = this
    this.setData({
      AvatarUrl: "https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/testava.jpg?sign=6fdab6348eeeeecc9ae14d7c992abb03&t=1588086430",
      
      logthree: [{'date':'2.30','proj':'步行10公里','change':'+10'},{'date':'3.32','proj':'长跑5公里','change':'+15'},{'date':'4.31','proj':'步行10公里','change':'+10'}]
    })
    db.collection('person_message').doc('19762d645eae6142004ed6e32b6e4da4').get({
      success:res =>{
        that.setData({
          score:res.data._score
        })
      }
    })

    db.collection('sport').where({
      _openid: user_openid
    })
    .get({
      success:res =>{
        console.log(res.data)
        that.setData({
          my_release_detail:res.data
        })
      }
    })
  },
  onShow: function (options) {
    db.collection('person_message').doc('19762d645eae6142004ed6e32b6e4da4').get({
      success: res => {
        that.setData({
          score: res.data._score
        })
        console.log('成功更新')
      }
    })
  },
  
})