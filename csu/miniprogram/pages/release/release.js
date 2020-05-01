// pages/release/release.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    introduction:'',
    sport_title:'',
    loadingHidden:true,
    location:"点击获取地理位置",
    level:'选择等级',
    //发起运动的文字内容
    toView: '',
    listItem:["难","中","易"],
    show:false,
    text: ["一段文字一段文字一段文字一段文字","一段文字一段文字一段文字一段文字","一段文字一段文字一段文字一段文字"],
    //状态栏高度
    windowHeight: 0,
    windowWidth:0,
    //列表中体育项目
    sportkinds:["球类","田径","武术","游泳","健美操","滑雪","自行车","登山","击剑","轮滑","拔河","瑜伽","棋类","跆拳道"],
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' }
    ],
    value1: 0,
    value2: 'a'
  },
  setlocation: function(){
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
  },
  toView: function () {
    this.setData({
      toView: view,
    })
  },
  selectlevel:function(e){
    let i = e.currentTarget.dataset.index
    this.setData({
      level:this.data.listItem[i]
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  submit:function(e){
    var that = this
    that.setData({
      loadingHidden:false
    })
    setTimeout(function(){
      that.setData({
        loadingHidden: true
      })
      db.collection('sport').add({
        data:{
          _sport_title:that.data.sport_title,
          _introduction:that.data.introduction,
          _name:that.data.name,
          _time:'未定'
        },
        success: res => {
          console.log("成功添加运动信息！")
          
        }
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
      
    },1000)
},

  intro_change:function(e){
    this.setData({
      introduction:e.detail.value
    })
  },
  name_change:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  sport_title_change:function(e){
    this.setData({
      sport_title: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this
    // console.log(app.globalData)
    wx.getSystemInfo({
      success: function (res) {
        console.log('windowHeight: ' + res.windowHeight)
        console.log('windowWidith: ' + res.windowWidth)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth:res.windowWidth
        })
      },
    })
  },
  //获取高度
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