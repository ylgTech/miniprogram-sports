// miniprogram/pages/execlUpload/execlUpload.js
Page({
  //选择excel表格
  chooseExcel(){
    let that = this
    wx.chooseMessageFile({
      count:1,
      type: 'file',
      success(res){
        let path = res.tmpFiles[0].path;
        console.log("选择excel成功",path)
        that.uploadExcel(path)
      }
    })
  },

  //2.上传excel表格到云存储
  uploadExcel(path){
    let that = this
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime+".xls",
      filePaht:path,
      sucess : res => {
        console.log("上传成功", res.fileID)
        that.deal(res.fileID)
      },
      fail : err =>{
        console.log("上传失败",err)
      }
    })
  },

  //3.解析excel数据并上传到云数据库
  deal(fileID){
    wx.cloud.callFunction({
      name: "excelUpload",
      data:{
        fileID: fileID
      },
      success(res) {
        console.log("解析并上传成功", res)
      },
      fail(res) {
        console.log("解析失败",res)
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

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