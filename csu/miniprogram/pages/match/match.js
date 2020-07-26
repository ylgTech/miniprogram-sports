// pages/match/match.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOfi:true,
    username:'',
    AvatarUrl:'',
    openid:'',
    match_all:[],
    num:-1,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/%E4%BA%911.png?sign=f443bc28365fbb8703347ef5c8fc59ea&t=1588149416',
      'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/%E4%BA%911.png?sign=f443bc28365fbb8703347ef5c8fc59ea&t=1588149416',
      'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/%E4%BA%911.png?sign=f443bc28365fbb8703347ef5c8fc59ea&t=1588149416',
    ],
    indicatorDots: true, //导航点
    autoplay: true,
    circular: true, //衔接滑动
    interval: 5000,
    duration: 1000,
    pop_detail: false,
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  delete:function(e){
    var that=this
    var id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    var _id = this.data.match_all[id]._id;  // 通过id判断是哪个推文的链接
    db.collection('match').doc(_id).remove({
      success:res=>{
        wx.showToast({
          title: '删除成功',
          icon:'success',
        })
      },
      fail:err=>{
        wx.showToast({
          title: '删除失败',
          icon:'none',
        })
      }
    })
    this.onLoad();
    this.onShow();
  },
  getOpenid(){
    let that=this;
    wx.cloud.callFunction({
      name:'getOpenid',
      complete:res=>{
        console.log(res.result.openid)
        var openid=res.result.openid;
        db.collection('account_info').where({
          _openid:res.result.openid
        }).get({
          success: res => {
            console.log(res)
            that.setData({
              username:res.data[0].nickName,
              AvatarUrl:res.data[0].avatar,
              score:res.data[0].score,
            })
          }
        })
        that.setData({
          openid:openid
        })
      }
    })
  },
  bindGetUserInfo (e) {
    var that=this
    console.log(e.detail.userInfo.nickName)
   that.setData({
      username:e.detail.userInfo.nickName,
      AvatarUrl:e.detail.userInfo.avatarUrl,
      })
    this.getOpenid()
  },
  match_par:function(e){
    var that=this
    var id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    var url = this.data.match_all[id]._introduction;  // 通过id判断是哪个推文的链接
    console.log(that.data.isOfi)
    if(that.data.isOfi==false)
    {
      db.collection('match_par').where({
        _url:url,
      }).get({
        success:res=>{
          var num=res.data.length;
          console.log('num'+num)
          db.collection('match_par').where({
            _url:url,
            _openid:that.data.openid,
          }).get({
            success:res=>{
              console.log('num'+num)
              if(res.data.length==0)
              {
                if(num==-1)
                {
                  console.log("错误")
                }else{
                  console.log("插入")
                  num++;
                  db.collection('match_par').add({
                    data:{
                      _num:num,
                      _url:url,
                      _name:that.data.username,
                      _avatarurl:that.data.AvatarUrl,
                    }
                  })
                  wx.showToast({
                    title: '报名成功',
                    icon:'success',
                  })
                }
              }else{
                wx.showToast({
                  title: '已经报名',
                  icon:'none',
                })
              }
            }
          })
        }
      })
    }else{
      this.savaExcel()
      this.getFileUrl()
    }
  },
  match_detail: function(e) {
    var id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    var url = this.data.match_all[id]._introduction;  // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '../../components/show/show?name=match_all&url=' + url,
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
            pop_detail: false
          })
        }, 2000)
      }, //接口调用成功
      fail: function() {}, //接口调用失败的回调函数  
      complete: function() {} //接口调用结束的回调函数  
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var isOfi = getApp().globalData.isOfi
    var that = this
    console.log("ofi"+that.data.isOfi)
    wx.cloud.callFunction({
      name: "getUsers",
      success(res) {
        console.log("读取成功", res.result.data)
        that.savaExcel(res.result.data)
      },
      fail(res) {
        console.log("读取失败", res)
      }
    })
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
    db.collection('match').get({
      success: res => {
        console.log(res.data)
        that.setData({
          match_all: res.data.reverse()
        })
      }
    })
      that.setData({
        isOfi:isOfi,
      })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
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