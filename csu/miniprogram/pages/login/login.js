const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:0,
    windowWidth:0,
    name: '',
    number: '',
  },
  mess_change: function(e) {
  
    console.log(e.detail.value)
    this.setData({
      number: e.detail.value
    })
  },
  mess_change2: function(e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  register: function(e) {
    var that = this
    var regLowerCase = new RegExp('[a-z]', 'g');//判断用户输入的是否为小写字母
    var regCapitalLetter = new RegExp('[A-Z]', 'g');//判断用户输入的是否为大写字母
    var regNum = new RegExp('[0-9]', 'g');//判断用户输入的是否为数字
    var rsLowerCase = regLowerCase.exec(that.data.number);
    var rsCapitalLetter = regCapitalLetter.exec(that.data.number);
    var rsNum = regNum.exec(that.data.number);
    console.log(that.data.number.length)
    if (!rsNum){
      wx.showToast({
        title: '学号不为数字!',
        icon: 'loading',
      })
      return
    }
    if (that.data.number.length != 10 && that.data.number.length != 9){
      wx.showToast({
        title: '学号位数有误!',
        icon:'loading',
      })
      return
    }
    if (that.data.name=='') {
      wx.showToast({
        title: '用户名为空!',
        icon: 'loading',
      })
      return
    }
    wx.showToast({
      title: '注册成功!',
    })
    setTimeout(function() {
      db.collection('person_login').add({
        data: {
          _number: that.data.number,
          _name: that.data.name,
        },
        success: res => {
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
  onLoad: function(options) {
    var that = this
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
        db.collection('person_login').where({
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