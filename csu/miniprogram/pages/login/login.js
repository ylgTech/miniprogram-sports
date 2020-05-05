const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    number: '',
  },
  mess_change: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  mess_change2: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  register: function (e) {
    var that = this
    
    setTimeout(function () {
      db.collection('person_login').add({
        data: {
          _number: that.data.number,
          _name: that.data.name,
        },
        success: res => {
          console.log("成功注册！")
          console.log(app.appData.user_openid)
          wx.reLaunch({
            url: '../index/index',
          })
        }
      })
    }, 500);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'login',

      // 成功回调
      complete: res => {
        app.appData.user_openid = res.result.openid
      }
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