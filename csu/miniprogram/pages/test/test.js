// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  /**
 * 页面的初始数据
 */
  data: {
    degs: 0,
    degss: 0,
    degsss: 0,
    subords: [
      { name: '张三', pay: '300.00' },
      { name: '李四', pay: '400.00' },
      { name: 'Marry', pay: '200.00' },
      { name: '龙霸天', pay: '300.00' },
    ]
  },

  /**
   * 折叠展开动画
   */
  rotateAnim: function () {
    let deg = this.data.degs;
    deg = deg == 0 ? 90 : 0;
    this.setData({
      degs: deg
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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