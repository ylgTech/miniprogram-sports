// pages/match/match.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    match_all:[],
    imgUrls: [
      'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/%E4%BA%911.png?sign=f443bc28365fbb8703347ef5c8fc59ea&t=1588149416',
      'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/%E4%BA%911.png?sign=f443bc28365fbb8703347ef5c8fc59ea&t=1588149416',
      'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/%E4%BA%911.png?sign=f443bc28365fbb8703347ef5c8fc59ea&t=1588149416',
    ],
    indicatorDots: true, //导航点
    autoplay: true,
    circular: true, //衔接滑动
    interval: 5000,
    duration: 1000,
    pop_detail: false,

  },
  match_detail: function(e) {
    var id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    var url = this.data.match_all[id]._introduction;  // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '../../components/show/show?name=photoTweets&url=' + url,
    })
    console.log('开启')
  },
  pop_fade: function(e) {
    var that = this
    wx.showToast({
      title: '参加成功', //提示文字
      duration: 2000, //显示时长
      mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
      icon: 'success', //图标，支持"success"、"loading"  
      success: function() {
        setTimeout(function() {
          that.setData({
            pop_detail: false
          })
        }, 2000)
      }, //接口调用成功
      fail: function() {}, //接口调用失败的回调函数  
      complete: function() {} //接口调用结束的回调函数  
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    db.collection('match').get({
      success: res => {
        console.log(res.data)
        that.setData({
          match_all: res.data.reverse()
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})