const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    windowWidth: 0,
    name: '',
    number: '',
  },
  mess_change: function (e) {

    console.log(e.detail.value)
    this.setData({
      number: e.detail.value
    })
  },
  mess_change2: function (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  register: async function (e) {
    var that = this
    var regLowerCase = new RegExp('[a-z]', 'g');//判断用户输入的是否为小写字母
    var regCapitalLetter = new RegExp('[A-Z]', 'g');//判断用户输入的是否为大写字母
    var regNum = new RegExp('[0-9]', 'g');//判断用户输入的是否为数字
    var rsLowerCase = regLowerCase.exec(that.data.number);
    var rsCapitalLetter = regCapitalLetter.exec(that.data.number);
    var rsNum = regNum.exec(that.data.number);
    console.log(that.data.number.length)
    if (!rsNum) {
      wx.showToast({
        title: '学号不为数字!',
        icon: 'loading',
      })
      return
    }
    if (that.data.number.length != 10 && that.data.number.length != 9) {
      wx.showToast({
        title: '学号位数有误!',
        icon: 'loading',
      })
      return
    }
    if (that.data.name == '') {
      wx.showToast({
        title: '用户名为空!',
        icon: 'loading',
      })
      return
    }
    const rc = await db.collection('account_info')
      .where(db.command.or([{
        csuid: that.data.number,
      },{
        _openid: app.appData.user_openid,
      }]))
      .field({
        csuid: true
      })
      .get()
      .catch(err => {
        wx.showToast({
          title: '网络繁忙，请稍后再试吧！',
        })
        return;
      })
    if (rc.data.length > 0) {
      wx.showToast({
        title: '该学工号或微信已注册，请核对或联系服务人员',
        icon: 'none'
      })
      return;
    }
    setTimeout(function () {
      db.collection('account_info').add({
        data: {
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
          csuid: that.data.number,
          isOfficial: false,
          nickName: that.data.name,
          //nickName is preserved to fill as the nickName of WeChat
          //However, to get the user's nickName
          //wx.login() is needed.
          //So it is left same as realName now.
          realName: that.data.name,
          score: 0,
        },
        success: res => {
          console.log(app.appData.user_openid)
          wx.reLaunch({
            url: '../index/index',
          })
          wx.showToast({
            title: '注册成功!',
          })
        },
        catch: res => {
          wx.showToast({
            title: '网络繁忙，请稍后再试',
            icon: 'none'
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