const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    windowWidth: 0,
    password: '',
    username: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  mess_change: function (e) {
    console.log(e.detail.value)
    this.setData({
      username: e.detail.value
    })
  },
  mess_change2: function (e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  register: function (e) {
    var that = this
   db.collection('Root').where({
     username:that.data.username,
     password:that.data.password,
   }).get({
     success:res=>{
       console.log(res)
       if(res.data.length!=0){
        getApp().globalData.isOfi = true;
        getApp().globalData.root_id = that.data.username;
        wx.switchTab({
          url: '../me/me'
        })
       }else{
        wx.showToast({
          title: '请检查账号密码是否正确',
          icon: 'none'
       })
       }
     },
    catch: res => {
      wx.showToast({
        title: '网络繁忙，请稍后再试',
        icon: 'none'
     })
    }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log('windowHeight: ' + res.windowHeight)
        console.log('windowWidith: ' + res.windowWidth)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'login',
      // 成功回调
      complete: res => {
        app.appData.user_openid = res.result.openid
        console.log(app.appData.user_openid)
        db.collection('account_info').where({
          _openid: res.result.openid
        }).get({
          success: res => {
            if (res.data.length != '0') {
              console.log('已经注册')
            }
          }
        })
      }
    })
  },

  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
    this.setData({
      nickname:e.detail.userInfo.nickName,
      img:e.detail.userInfo.avatarUrl,
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})