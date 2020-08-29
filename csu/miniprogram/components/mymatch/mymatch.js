const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    match: [],
    user_id : null
  },

  getUserId: function() {
    var that = this;
    var tmp = Math.floor(Math.random()*1000 + 1000);
    console.log(tmp);
    db.collection('User').where({user_id:tmp}).get({
      success: res=>{
        if(res.data.length === 0)
        {
          that.setData({
            user_id : tmp
          })
        }else{
          getUserId();
        }
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.root_id)
    db.collection('Activity').where({
        root_id: app.globalData.root_id,
      })
      .get({
        success: res => {
          console.log(res.data)
          that.setData({
            match: res.data
          })
        }
      })
    console.log('下载execl页面');
    
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

  },
  //把数据保存到excel里，并把excel保存到云存储
  savaExcel(userdata) {
    let that = this
    wx.cloud.callFunction({
      name: "excel",
      data: {
        userdata: userdata
      },
      success(res) {
        console.log("保存成功", res)
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        console.log("保存失败", res)
      }
    })
  },

  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl(fileID) {
    let that = this;
    console.log("开始下载");
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        // get temp file URL
        console.log("文件下载链接", res.fileList[0].tempFileURL)
        that.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
      },
      fail: err => {
        // handle error
      }
    })
  },
  //复制excel文件下载链接
  copyFileUrl() {
    let that=this
    wx.setClipboardData({
      data: that.data.fileUrl,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log("复制成功",res.data) // data
          }
        })
      }
    })
  },
  itemclick: function (item) {
    let that = this;
    console.log(item)
    //读取users表数据
    wx.cloud.callFunction({
      name: "getUsers",
      data : {
        activity_id: item.currentTarget.dataset.item._id
      },
      success(res) {
        console.log(item.currentTarget.dataset.item._id)
        console.log("读取成功", res.result.data)
        that.savaExcel(res.result.data)
      },
      fail(res) {
        console.log("读取失败", res)
      }
    })
  },
   //选择excel表格
   chooseExcel(item) {
    let that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        let path = res.tempFiles[0].path;
        that.uploadExcel(path,item)
        console.log("选择excel成功", path)
      }
    })
  },

  //2.上传excel表格到云存储
  uploadExcel(path,item) {
    let that = this
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+".xls",
      filePath: path,
      success : res => {
        console.log("上传成功", res.fileID);
        that.deal(res.fileID,item);
      },
      fail : err =>{
        // console.log(typeof(filePath),filePath);
        console.log("上传失败",err);
      }
    })
  },

  //3.解析excel数据并上传到云数据库
  deal(fileID,item) {
    console.log("开始解析");
    wx.cloud.callFunction({
      name: "excelUpload",
      data: {
        fileID: fileID,
        activity_name : item.currentTarget.dataset.item.name
      },
      success(res) {
        console.log("解析并上传成功", res)
      },
      fail(res) {
        console.log("解析失败", res)
      }
    })
    console.log("解析完毕");
  },
  itemclick_upload:function(item){
    let that = this;
    console.log(item);
    that.chooseExcel(item);
  }
})