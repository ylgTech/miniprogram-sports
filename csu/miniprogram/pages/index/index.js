// pages/index/index.js
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
    active: 1,
    value: '2018-11-11',
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    lastMonth: 'lastMonth',
    nextMonth: 'nextMonth',
    selectVal: '',
    imgUrls: [
      "https://i0.hdslb.com/bfs/sycp/creative_img/202004/f35607c9c112e5934dd45169484053c3.jpg", "https://i0.hdslb.com/bfs/sycp/creative_img/202004/f35607c9c112e5934dd45169484053c3.jpg", "https://i0.hdslb.com/bfs/sycp/creative_img/202004/f35607c9c112e5934dd45169484053c3.jpg"
    ],
    rank: [{
        id: 1,
        name: '我是谁',
        grade: 9999,
        iconPath: '../../images/touxiang.png',
        // 控制icon大小
        width: 27,
        height: 40,
      },
      {
        id: 2,
        name: '我是谁',
        grade: 9998,
        iconPath: '../../images/touxiang.png',
        // 控制icon大小
        width: 27,
        height: 40,
      }, {
        id: 3,
        name: '我是谁',
        grade: 9997,
        iconPath: '../../images/touxiang.png',
        // 控制icon大小
        width: 27,
        height: 40,
      }, {
        id: 4,
        name: '我是谁',
        grade: 9996,
        iconPath: '../../images/touxiang.png',
        // 控制icon大小
        width: 27,
        height: 40,
      }, {
        id: 5,
        name: '我是谁',
        grade: 9995,
        iconPath: '../../images/touxiang.png',
        // 控制icon大小
        width: 27,
        height: 40,
      }, {
        id: 6,
        name: '我是谁',
        grade: 9994,
        iconPath: '../../images/touxiang.png',
        // 控制icon大小
        width: 27,
        height: 40,
      }, {
        id: 7,
        name: '我是谁',
        grade: 9993,
        iconPath: '../../images/touxiang.png',
        // 控制icon大小
        width: 27,
        height: 40,
      }, {
        id: 8,
        name: '我是谁',
        grade: 9992,
        iconPath: '../../images/touxiang.png',
        // 控制icon大小
        width: 27,
        height: 40,
      }, {
        id: 9,
        name: '我是谁',
        grade: 9991,
        iconPath: '../../images/touxiang.png',
        // 控制icon大小
        width: 27,
        height: 40,
      },
    ],
  },
  select: function (e) {
    this.setData({
      selectVal: e.detail
    })
  },
  toggleType() {
    this.selectComponent('#Calendar').toggleType();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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