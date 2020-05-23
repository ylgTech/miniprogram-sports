// pages/me/me.js
const db = wx.cloud.database()
const app = getApp()
//用于获取屏幕信息 适配屏幕大小
var windowHeight = 0;

Page({
  data: {
    AvatarUrl: 'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/avademo.png?sign=032b26657afd1c64dd19a5798feab256&t=1588086418',
    username: '加载中',
    score: 0,
    logthree: [],
    //状态栏和标题栏的高度
    windowHeight: 0,
    statusBarHeight: 0,
    titleBarHeight: 0,
    my_release: false, //控制我发起的
    my_release_detail: ["try"], //控制我发起的
    my_join: false, //控制我我参加的
    my_join_detail: ["try", "try"], //控制我我参加的
    touch_times_release: 1, //控制我发起的
    touch_times_join: 1, //控制我参加的
    pop_detail_release: false, //控制我发起
    pop_detail_join: false, //控制我参加
    join_height: '', //我参加的需要移动距离
    none_height: '', //未完待续需要移动距离
  },
  join_hidden_change: function(e) { //控制我参加
    var that = this
    var touch_times_join = that.data.touch_times_join
    let query = wx.createSelectorQuery()
    query.select('#join').boundingClientRect((rect) => {
      let top = rect.top
      this.setData({
        join_height: top,
      })
    }).exec()
    var join_height = -this.data.join_height + this.data.titleBarHeight
    console.log(join_height)
    var animation_join = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join1 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join3 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    animation_join.translateY(-428).step();
    animation_join1.translateY(0).step();
    animation_join2.translateY(-70).opacity(0).step();
    animation_join3.translateY(0).opacity(1).step();
    that.setData({
      touch_times_join: touch_times_join + 1
    })
    if (that.data.my_release==true){
      that.setData({
        my_release:false
      })
    }
    if (that.data.touch_times_join % 2 == 0) {
      setTimeout(function() {
        that.setData({
          my_join: true
        })
      }, 1000)
      that.setData({
        ani_join: animation_join.export(),
        ani_join1: animation_join2.export()
      })
    } else {

      that.setData({
        my_join: false
      })

      that.setData({
        ani_join: animation_join1.export(),
        ani_join1: animation_join3.export(),
      })
    }
  },
  release_hidden_change: function(e) { //控制我发起的
    var that = this
    var touch_times_release = that.data.touch_times_release
    that.setData({
      touch_times_release: touch_times_release + 1
    })
    if (that.data.touch_times_release % 2 == 0) {
      that.setData({
        my_release: true
      })


    } else {
      this.setData({
        my_release: false
      })
    }
  },
  match_detail_release: function(e) { //控制release
    this.setData({
      pop_detail_release: true
    })
    console.log('开启')
  },
  pop_fade2_release: function(e) { //控制release
    var that = this
    setTimeout(function() {
      that.setData({
        pop_detail_release: false
      })
    }, 100)
    console.log('关闭')
  },
  match_detail_join: function(e) { //控制join
    this.setData({
      pop_detail_join: true
    })
    console.log('开启')
  },
  pop_fade2_join: function(e) { //控制join
    var that = this
    setTimeout(function() {
      that.setData({
        pop_detail_join: false
      })
    }, 100)
    console.log('关闭')
  },


  onLoad: function(options) {
    var that = this
    this.setData({
      AvatarUrl: "https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/testava.jpg?sign=6fdab6348eeeeecc9ae14d7c992abb03&t=1588086430",

      logthree: [{
        'date': '2.30',
        'proj': '步行10公里',
        'change': '+10'
      }, {
        'date': '3.32',
        'proj': '长跑5公里',
        'change': '+15'
      }, {
        'date': '4.31',
        'proj': '步行10公里',
        'change': '+10'
      }]
    })
    db.collection('person_message').doc('19762d645eae6142004ed6e32b6e4da4').get({
      success: res => {
        that.setData({
          score: res.data._score
        })
      }
    })
    //这里你要加个初始化join的
    db.collection('sport').where({
        _openid: app.appData.user_openid
      })
      .get({
        success: res => {
          console.log(res.data)
          that.setData({
            my_release_detail: res.data
          })
        }
      })
    db.collection('Participate').where({
        _openid: app.appData.user_openid
      })
      .get({
        success: res => {
          console.log(res.data)
          that.setData({
            my_participate_detail: res.data
          })
        }
      })
  },
  onShow: function(options) {
    db.collection('person_message').doc('19762d645eae6142004ed6e32b6e4da4').get({
      success: res => {
        that.setData({
          score: res.data._score
        })
        console.log('成功更新')
      }
    })
    console.log('切换成功')
    console.log(app.appData.user_openid)
    this.getWindowHeight();
  },
  /** 
   * 获取用户设备屏幕高度
   */
  getWindowHeight: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        var statusBarHeight = res.statusBarHeight;
        var titleBarHeight;
        // 确定titleBar高度（区分安卓和苹果
        if (wx.getSystemInfoSync().system.indexOf('iOS') > -1) {
          titleBarHeight = 44
        } else {
          titleBarHeight = 48
        }
        windowHeight = res.windowHeight - statusBarHeight - titleBarHeight
        console.log('windowHeight: ' + res.windowHeight)
        that.setData({
          windowHeight: res.windowHeight,
          statusBarHeight: statusBarHeight,
          titleBarHeight: titleBarHeight,
          mapHeight: windowHeight - 32,
        })
      },
    })
  },

})