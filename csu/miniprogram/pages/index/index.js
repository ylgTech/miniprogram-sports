// pages/index/index.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
Page({
  onLoad: function() {

    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })

  }, //获取页面长度,高度
  /**
   * 页面的初始数据
   */
  data: {
    detailIndex: 0,
    load_show: false,
    pop_btn: true,
    pop_btn_in: false,
    pop_detail: false,
    match_all: [],
    active: 0,
    value: '2018-11-11',
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    lastMonth: 'lastMonth',
    nextMonth: 'nextMonth',
    selectVal: '',
    imgUrls: [
      "https://656e-energycsu-x8fn6-1301628535.tcb.qcloud.la/%E5%B0%8F%E7%BB%84%E8%AF%A6%E6%83%85%E9%A1%B5img/paobu.jpg?sign=e3e5e5d7d1b2bd9227eb91fe7ba99a98&t=1588412928", "https://656e-energycsu-x8fn6-1301628535.tcb.qcloud.la/%E5%B0%8F%E7%BB%84%E8%AF%A6%E6%83%85%E9%A1%B5img/zuqiu1.jpg?sign=313bafac7d572f421d2d9450342626ec&t=1588412797", "https://656e-energycsu-x8fn6-1301628535.tcb.qcloud.la/%E5%B0%8F%E7%BB%84%E8%AF%A6%E6%83%85%E9%A1%B5img/paobu.jpg?sign=e3e5e5d7d1b2bd9227eb91fe7ba99a98&t=1588412928",
    ],
    rank: [{
        rank: 1,
        name: '陈平安',
        grade: 9999,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        // 控制icon大小
        width: 27,
        height: 40,
        imgSrc: 'first.png',
      },
      {
        rank: 2,
        name: '李凤仪',
        grade: 9998,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        // 控制icon大小
        width: 27,
        height: 40,
        imgSrc: 'second.png',
      },
      {
        rank: 3,
        name: '曾欢送',
        grade: 9997,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        // 控制icon大小
        width: 27,
        height: 40,
        imgSrc: 'third.png',
      },
      {
        rank: 4,
        name: '吴新罕',
        grade: 9996,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        // 控制icon大小
        width: 27,
        height: 40,
      },
      {
        rank: 5,
        name: '谢桥槮',
        grade: 9995,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        // 控制icon大小
        width: 27,
        height: 40,
      },
      {
        rank: 6,
        name: '张泽以',
        grade: 9994,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        // 控制icon大小
        width: 27,
        height: 40,
      },
      {
        rank: 7,
        name: '徐俊封',
        grade: 9993,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        // 控制icon大小
        width: 27,
        height: 40,
      },
      {
        rank: 8,
        name: '叶伏天',
        grade: 9992,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        // 控制icon大小
        width: 27,
        height: 40,
      },
      {
        rank: 9,
        name: '叶无尘',
        grade: 9991,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        // 控制icon大小
        width: 27,
        height: 40,
      },
    ],
  },
  select: function(e) {
    this.setData({
      selectVal: e.detail
    })
  },
  toggleType() {
    this.selectComponent('#Calendar').toggleType();
  },
  match_detail: function(e) {
    console.log(e)
    this.setData({
      pop_detail: true,
      detailIndex: e.currentTarget.id
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
            pop_detail: false,
            pop_btn: false,
            pop_btn_in: true
          })
        }, 2000)
      }, //接口调用成功
      fail: function() {}, //接口调用失败的回调函数  
      complete: function() {} //接口调用结束的回调函数  
    })
    
    console.log('关闭')
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
  mark: function(e) {
    var that = this
    this.setData({
      load_show: true
    })

    

    setTimeout(function() {
      that.setData({
        
        load_show: false
      })
      wx.showToast({
        title: '打卡成功', //提示文字
        duration: 800, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'success', //图标，支持"success"、"loading"  
        success: function () {
          setTimeout(function () {
            that.setData({
              pop_detail: false,
              
            })
          }, 800)
        }, //接口调用成功
        fail: function () { }, //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
      })
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    db.collection('sport').get({
      success: res => {
        console.log(res.data)
        that.setData({
          match_all: res.data
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

  },

  onClose(){
    this.setData({
      pop_detail: false
    })
  }
})