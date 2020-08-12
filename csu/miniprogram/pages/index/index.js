// pages/index/index.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var util = require('../../utils/util.js');

var qqmapsdk = new QQMapWX({

  key: 'ZVDBZ-VBUHQ-CRJ55-GRU7W-FDACJ-B4BMW'

});
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

    distance: '',
    latitude: '',
    longitude: '',
    clockedMan: [],
    clockingMan: [],
    clockedNum: '0',
    totalNum: '0',
    clockDetail: false,
    windowHeight: '',
    windowWidth: '',
    sportId: '',
    detailIndex: 0,
    load_show: false,
    pop_btn: false,
    pop_btn_in: false,
    pop_btn_start: false,
    pop_detail: false,
    match_all: [],
    active: 0,
    value: '2018-11-11',
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    lastMonth: 'lastMonth',
    nextMonth: 'nextMonth',
    selectVal: '',
    imgUrlPre:'https://656e-energycsu-x8fn6-1301628535.tcb.qcloud.la/%E5%9B%BE%E7%89%87/1.jpg?sign=aefe7511f2365d559f373af6d045e2f6&t=1595732807',
    imgUrls: [
      "https://656e-energycsu-x8fn6-1301628535.tcb.qcloud.la/%E5%9B%BE%E7%89%87/kalen-emsley-kGSapVfg8Kw-unsplash.jpg?sign=a076fa7a17b73ee4650a83c5244efbe9&t=1590280808", "https://656e-energycsu-x8fn6-1301628535.tcb.qcloud.la/%E5%9B%BE%E7%89%87/noah-buscher-jyQChhw-WbI-unsplash.jpg?sign=62de79f3fcb38cbc26c355f330d1a9af&t=1590280867", "https://656e-energycsu-x8fn6-1301628535.tcb.qcloud.la/%E5%9B%BE%E7%89%87/kate-m-O0x4a5pJP0M-unsplash.jpg?sign=9404a6f424e10025bb52163812cbe87e&t=1590308897",
    ],
    img:null,
  },
  select: function(e) {
    this.setData({
      selectVal: e.detail
    })
  },
  toggleType() {
    this.selectComponent('#Calendar').toggleType();
  },

  //活动点击事件，显示详情页
  match_detail: function(e) {
    var that = this
    db.collection('Participate').where({
        activity_id: that.data.match_all[e.currentTarget.id]._id,
        _openid: app.appData.user_openid
      })
      .get({
        success: res => {
          if (res.data.length != 0) {

            that.setData({
              pop_btn_in: true,
              pop_btn: false
            })
          }
          that.setData({
            participateId:res.data[0]._id
          })
        }
      })
    // db.collection('Participate').where({
    //     _sport_id: that.data.match_all[e.currentTarget.id]._id,
    //     _sport_openid: app.appData.user_openid
    //   })
    //   .get({
    //     success: res => {
    //       if (res.data.length != 0) {

    //         that.setData({
    //           pop_btn_start: true
    //         })
    //       }
    //     }
    //   })
    if ( that.data.pop_btn_in == false) {
      that.setData({
        pop_btn: true
      })
    }
    this.setData({
      pop_detail: true,
      detailIndex: e.currentTarget.id,
      activity_id: that.data.match_all[e.currentTarget.id]._id
    })
    this.setData({
      sportId: that.data.match_all[e.currentTarget.id]._id
    })

    console.log('开启')
  },
  formSubmit(e){
    var _this=this;
    qqmapsdk.reverseGeocoder({
      location:'',
      success:function(res){
        console.log(res);
      },fail:function(error){
        console.error(error)
      }
    })
  },
  //参与运动点击事件
  pop_fade: function(e) {
    var that = this
    var detailIndex = that.data.detailIndex
    var match_all = that.data.match_all
    db.collection('Participate').add({
      data: {
        // _if_finished: false,
        activity_id: match_all[detailIndex]._id,
        status:'sign pu',
        user_id:''
      },
      success: {}
    })
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


  //距离运算
  distance2: function(lat1, lng1, lat2, lng2) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.calculateDistance({
      mode: 'straight', //可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      //from参数不填默认当前地址
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from: {
        latitude: lat1,
        longitude: lng1
      }, //若起点有数据则采用起点坐标，若为空默认当前地址
      to: [{
        latitude: lat2,
        longitude: lng2
      }], //终点坐标
      success: function(res) { //成功后的回调
        console.log(res);
        var res = res.result;
        var dis = [];
        for (var i = 0; i < res.elements.length; i++) {
          dis.push(res.elements[i].distance); //将返回数据存入dis数组，
        }
        _this.setData({ //设置并更新distance数据
          distance: dis
        });
        console.log(dis)
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });

  },
  distance: function(lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;
    return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2))) - 3700

    // var La1 = la1 * Math.PI / 180.0;

    // var La2 = la2 * Math.PI / 180.0;

    // var La3 = La1 - La2;

    // var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;

    // var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));

    // s = s * 6378.137;//地球半径

    // s = Math.round(s * 10000) / 10000;

    //  return s

    // console.log("计算结果",s)

  },

  //获取参与者地理位置,进行打卡运算
  setlocationP: function(e) {
    var that = this
    var latitude1, latitude2, longitude1, longitude2
    var distance
    //四个var 进行运算
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        latitude1 = res.latitude,
        longitude1 = res.longitude
        db.collection('sport').where({
          _id: that.data.sportId
        }).get().then(res => {
          latitude2 = res.data[0]._latitude
          longitude2 = res.data[0]._longitude
          console.log('发起者位置', latitude2, longitude2)
          console.log('参与者位置', latitude1, longitude1)
          that.distance2(latitude1, longitude1, latitude2, longitude2)
          distance = that.data.distance[0]
          console.log("当前距离", distance)

          wx.showLoading({
            title: '打卡中',
            mask: true,
            success: function() {
              setTimeout(function() {
                if (distance < 200) {
                  wx.hideLoading()

                  db.collection('Participate').where({
                    _sport_id: that.data.sportId,
                    _openid: app.appData.user_openid
                  }).get({
                    success: function(res) {
                      var participateId = res.data[0]._id
                      console.log(participateId)

                      db.collection('Participate').doc(participateId).update({
                        data: {
                          _picture:that.data.img,
                          _if_finished: true
                        },
                        success: res => {
                          console.log('打卡成功')
                        }
                      })

                    }
                  })

                  wx.showToast({
                    title: '打卡成功！',
                    icon: 'success',
                    duration: 1000
                  })
                } else {
                  console.log('打卡失败')
                  wx.showToast({
                    title: '失败，请重试',
                    icon: 'none',
                    duration: 1000
                  })
                }
              }, 1000)
            }
          })
        })

      }
    })



  },
  //获取发起人地理位置
  setlocationS: function() {
    var that = this

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

      }
    })
    setTimeout(function() {
      db.collection('sport').doc(that.data.sportId).update({
        data: {
          _latitude: that.data.latitude,
          _longitude: that.data.longitude
        },
        success: res => {
          console.log('经纬度插入成功')
        }
      })
    }, 1000)
  },

  //发起打卡
  startMark: function(e) {
    var that = this
    this.onWatch()
    this.setData({
      clockDetail: true,
      pop_detail: false
    })
    this.setlocationS()

    db.collection('Participate').where({
      _sport_id: that.data.sportId,

    }).get({
      success: res => {
        that.setData({
          totalNum: res.data.length
        })
      },
      fail: res => {
        console('失败')
      }
    })
    db.collection('Participate').where({
      _sport_id: that.data.sportId,
      _if_finished: true
    }).get({
      success: res => {
        that.setData({
          clockedMan: res.data
        })
      },
      fail: res => {
        console('失败')
      }
    })
    db.collection('Participate').where({
      _sport_id: that.data.sportId,
      _if_finished: false
    }).get({
      success: res => {
        that.setData({
          clockingMan: res.data
        })
      },
      fail: res => {
        console('失败')
      }
    })
  },

  //发起人完成打卡
  finish: function(e) {
    var that = this
    db.collection('Participate').where({
        _sport_id: that.data.sportId
      })
      .watch({

        onChange: function(snapshot) {

          that.onShow()
        },
        onError: function(err) {
          console.error('the watch closed because of error', err)
        }
      }).close()
    that.setData({
      clockDetail: false,
      pop_detail: true,
    })
  },

    tabbarOnChange: async function(pageInfo){
        if (pageInfo.detail["title"] =="积分排行榜"){
            var rc = await db.collection('account_info')
                .field({
                    nickName: true,
                    score: true,
                    avatar: true
                })
                .limit(10)
                .orderBy('score', 'desc')
                .get()
                .catch(err => {
                    console.log(err)
                })
            
            var curRank = 1
            for (var item in rc.data){
                rc.data[item].rankNum = curRank++
            }

            this.setData({
                rank: { ...rc.data }
            })
        }
    },

  //页面数据更新
  refresh: function(e) {
    console.log('数据更新')
    var that = this
    db.collection('Participate').where({
      _sport_id: that.data.sportId,
      _if_finished: true
    }).get({
      success: res => {
        that.setData({
          clockedMan: res.data,
          clockedNum: res.data.length
        })
      }
    })
    db.collection('Participate').where({
      _sport_id: that.data.sportId,
      _if_finished: false
    }).get({
      success: res => {
        that.setData({
          clockingMan: res.data
        })
      }
    })
  },

  //参与打卡
  mark: function(e) {
    var that = this
    var length
    var lastTime
    var diff
    var nowTime
    that.formSubmit();
    that.getTime();
    
    db.collection('Participate').doc(that.data.participateId).get({
      success:res=>{
        lastTime = new Date(res.data.markTime)
        console.log('上次'+lastTime)
        nowTime=new Date().getTime()
        diff = (nowTime - lastTime)/(1000*60*60)
        console.log(diff+'小时')
        if(diff > 8){
          wx.showLoading({
            title: '上传中',
          });
          db.collection('Participate').doc(that.data.participateId).update({
            data:{
              imgs: db.command.push(that.data.imgUrlPre),
              markTime:that.data.markTime
            },
            success:res=>{
              console.log('打卡更新成功')
              wx.hideLoading({
                success: (res) => {},
              })
              wx.showToast({
                title: '打卡成功',
                icon:'success',
                
              })
            }
          })
        }else{
          wx.showToast({
            title: '当日请勿重复打卡',
            icon:'none'
          })
        }
      }
    })
    
   
    


    
    // this.setData({
    //   load_show: true
    // })
    // that.doUpload()
    // if(this.data.img==null){
    //   wx.showToast({
    //     title: '上传图片失败',
    //     icon:'none',
    //   })
    // }else{
    //   that.setlocationP()
    // }
    // setTimeout(function() {
    //   that.setData({

    //     load_show: false
    //   })
    //   wx.showToast({
    //     title: '打卡成功', //提示文字
    //     duration: 800, //显示时长
    //     mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
    //     icon: 'success', //图标，支持"success"、"loading"  
    //     success: function() {
    //       setTimeout(function() {
    //         that.setData({
    //           pop_detail: false,

    //         })
    //       }, 800)
    //     }, //接口调用成功
    //     fail: function() {}, //接口调用失败的回调函数  
    //     complete: function() {} //接口调用结束的回调函数  
    //   })
    // }, 1500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.formSubmit();
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
    this.distance2(25.303650, 118.796950, 25.304098, 118.793869)
    wx.getSystemInfo({
      success: function(res) {
        console.log('windowHeight: ' + res.windowHeight)
        console.log('windowWidith: ' + res.windowWidth)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
    db.collection('Activity').where({
      type: 'offline',
    
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          match_all: res.data
        })
      }
    })
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'login',

      // 成功回调
      success: res => {
        app.appData.user_openid = res.result.openid
        console.log(app.appData.user_openid)
        db.collection('account_info').where({
          _openid: res.result.openid
        }).get({
          success: res => {
            if (res.data.length != '0') {
              console.log('已经注册')
            } else {
              // wx.navigateTo({
              //   url: '../login/login',
              // })
            }
          }
        })
      }
    })
  },
  /**
   * 监听函数
   */
  onWatch: function() {
    var that = this;
    var detailIndex = that.data.detailIndex
    var match_all = that.data.match_all

    db.collection('Participate').where({
        _sport_id: that.data.sportId
      })
      .watch({

        onChange: function(snapshot) {
          console.log('docs\'s changed events', snapshot.docChanges)
          console.log('query result snapshot after the event', snapshot.docs)
          console.log('is init data', snapshot.type === 'init')
          that.refresh()
        },
        onError: function(err) {
          console.error('the watch closed because of error', err)
        }
      })
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

  onClose() {
    console.log('详情页关闭')
    this.setData({
      pop_detail: false,
      // pop_btn: false,
      // pop_btn_in: false,
      // pop_btn_start: false,
    })
  },
  //上传图片
  doUpload:function(){
    let that = this;
    let openid = getApp().globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            that.setData({
              bigImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
            let fileID = res.fileID;
            //把图片存到users集合表
            that.setData({
              imgUrlPre:fileID,
            })
          },
           fail: e => {
            console.error('[上传图片] 失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }
    })
  },
  getTime:function(){
    var time = util.formatTime(new Date());
    var that = this
    var lastTime
    var delta
    console.log("时间"+time)
    this.setData({
      markTime:time
    })
    // db.collection('Participate').doc(that.data.participateId).get({
    //   success:res=>{
    //     lastTime =res.data.markTime
    //     console.log('上次'+lastTime)
    //     console.log('这次'+time)
    //     delta= time - lastTime
    //     console.log(delta)
    //   }
    // })
  }


})