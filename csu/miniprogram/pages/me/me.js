// pages/me/me.js
const db = wx.cloud.database()
const app = getApp()
//用于获取屏幕信息 适配屏幕大小
var windowHeight = 0;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var passWord = require('../../configuration.js').passWord;
var join_top = 0;
var qqmapsdk = new QQMapWX({

  key: 'ZVDBZ-VBUHQ-CRJ55-GRU7W-FDACJ-B4BMW'

});

Page({
  data: {
    AvatarUrl: 'https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/avademo.png?sign=032b26657afd1c64dd19a5798feab256&t=1588086418',
    username: '点击获取头像',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    score: 0,
    logthree: [],
    //状态栏和标题栏的高度
    windowHeight: 0,
    statusBarHeight: 0,
    titleBarHeight: 0,
    detailIndex: 0,
    sportId:'',
    my_release: false, //控制我发起的
    my_release_detail: ["try"], //控制我发起的
    my_join: false, //控制我我参加的
    my_join_detail: ["try", "try"], //控制我我参加的
    touch_times_release: 1, //控制我发起的
    touch_times_join: 1, //控制我参加的
    pop_detail_release: false, //控制我发起
    pop_detail_join: false, //控制我参加
    join_height: '', //我参加的需要移动距离
    none_height: '', //未完待续需要移动距离
    clockDetail:false,//控制打卡详情页
    pop_btn_in: false,//控制打卡按钮
    pop_btn_start: false,//控制发起打卡按钮
    distance:[],
    openid:'',
    rootpassword:null,
    password:null,
    try_time: 0,
    isOfi:false,
  },
  goto_release:function(e){
    wx.navigateTo({
      url: '../release/release'
    })
 },
 goto_print:function(e){
  getApp().globalData.isOfi = true;
        wx.switchTab({
          url: '../match/match'
        })
 },
 goto_create:function(e){
  wx.navigateTo({
    url: '../../components/create-project/create-project'
  })
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
  join_hidden_change: function(e) { //控制我参加
    var that = this
    var touch_times_join = that.data.touch_times_join
    var animation_join = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join1 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join3 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join4 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join5 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    const query = this.createSelectorQuery(); 
      query.select(".btnitem_join").boundingClientRect(); 
      query.selectViewport().scrollOffset();
      query.exec((res) => {
        var use = res[0].top;
        animation_join.translateY(-use).step();
        animation_join1.translateY(0).step();
        animation_join2.translateY(-70).opacity(0).step();
        animation_join3.translateY(0).opacity(1).step();
        animation_join4.translateY(-use).step();
        animation_join5.translateY(0).step();
        that.setData({
          touch_times_join: touch_times_join + 1
        })
        if (that.data.my_release==true){
          that.setData({
            my_release:false
          })
        }
        if (that.data.my_join == false) {
          setTimeout(function() {
            that.setData({
              my_join: true
            })
          }, 1000)
        that.setData({
        ani_join2:animation_join4.export(),
        ani_join: animation_join.export(),
        ani_join1: animation_join2.export()
      })
    } else {

      that.setData({
        my_join: false
      })

      that.setData({
        ani_join2:animation_join5.export(),
        ani_join: animation_join1.export(),
        ani_join1: animation_join3.export(),
      })
    }
    })
  },
  release_hidden_change: function(e) { //控制我发起的
    var that = this
    var touch_times_release = that.data.touch_times_release
    var animation_join = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join1 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join3 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join4 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    var animation_join5 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    const query = this.createSelectorQuery(); 
      query.select(".btnitem_release").boundingClientRect(); 
      query.selectViewport().scrollOffset();
      query.exec((res) => {
        var use = res[0].top-this.data.statusBarHeight;
        animation_join.translateY(-use).step();
        animation_join1.translateY(0).step();
        animation_join2.translateY(-70).opacity(0).step();
        animation_join3.translateY(0).opacity(1).step();
        animation_join4.translateY(-70).opacity(0).step();
        animation_join5.translateY(0).opacity(1).step();
        that.setData({
          touch_times_release: touch_times_release + 1
        })
        if (that.data.my_join==true){
          that.setData({
            my_join:false
          })
        }
        if (that.data.my_release == false) {
          setTimeout(function(){
            that.setData({
              my_release:true
            })
          },1000)
          that.setData({
            ani_join:animation_join.export(),
            ani_join1:animation_join2.export(),
            ani_join2:animation_join4.export(),
          })
        } else {
          this.setData({
            my_release: false,
            ani_join:animation_join1.export(),
            ani_join1:animation_join3.export(),
            ani_join2:animation_join5.export(),
          })
        }
    });
  },
  match_detail_release: function(e) { //控制release
    var that = this
    // console.log(e)
    this.setData({
      pop_btn_start: true,
      pop_detail_release: true,
      detailIndex: e.currentTarget.id
    })
    this.setData({
      sportId: that.data.my_release_detail[e.currentTarget.id]._id
    })

    
    console.log('开启')
  },

  match_detail_join: function(e) { //控制join
    var that = this
    console.log(e)
    this.setData({
      pop_btn_in: true,
      pop_detail_join: true,
      detailIndex: e.currentTarget.id
    })
    this.setData({
      sportId: that.data.my_join_detail[e.currentTarget.id]._sport_id
    })
    db.collection('sport').doc(that.data.sportId)
      .get({
        success: res => {
          console.log(res.data)
          that.setData({
            my_join_detail2: res.data
          })
        },
        fail: res => {
          console.log('查无数据')
        }
      })
    console.log('开启')
  },
  //距离运算
  distance2: function (lat1, lng1, lat2, lng2) {
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
      success: function (res) { //成功后的回调
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
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });

  },
  //获取参与者地理位置,进行打卡运算
  setlocationP: function (e) {
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
            success: function () {
              setTimeout(function () {
                if (distance < 200) {
                  wx.hideLoading()

                  db.collection('Participate').where({
                    _sport_id: that.data.sportId,
                    _openid: app.appData.user_openid
                  }).get({
                    success: function (res) {
                      var participateId = res.data[0]._id
                      console.log(participateId)

                      db.collection('Participate').doc(participateId).update({
                        data: {
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
  setlocationS: function () {
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
    setTimeout(function () {
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
  //页面数据更新
  refresh: function (e) {
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
  /**
 * 监听函数
 */
  onWatch: function () {
    var that = this;
    var detailIndex = that.data.detailIndex
    var match_all = that.data.match_all

    db.collection('Participate').where({
      _sport_id: that.data.sportId
    })
      .watch({

        onChange: function (snapshot) {
          console.log('docs\'s changed events', snapshot.docChanges)
          console.log('query result snapshot after the event', snapshot.docs)
          console.log('is init data', snapshot.type === 'init')
          that.refresh()
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
        }
      })
  },
  //发起打卡
  startMark: function (e) {
    var that = this
    this.onWatch()
    this.setData({
      clockDetail: true,
      pop_detail_release:false
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
  finish: function (e) {
    var that = this
    db.collection('Participate').where({
      _sport_id: that.data.sportId
    })
      .watch({

        onChange: function (snapshot) {

          
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
        }
      }).close()
    that.setData({
      clockDetail: false,
      pop_detail_release: true,
    })
  },
//参与者参与打卡
  mark: function (e) {
    this.setlocationP()
  },

  onLoad: function(options) {
    var isOfi = getApp().globalData.isOfi
    var that = this
    // 查看是否授权
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
    that.verifycode = that.selectComponent("#verifycode");
    that.getOpenid();
    that.getPageId();
    that.setData({
      AvatarUrl: "https://6665-feifeiniubi-cmo2o-1301607192.tcb.qcloud.la/testava.jpg?sign=6fdab6348eeeeecc9ae14d7c992abb03&t=1588086430",
      isOfi:isOfi,
      logthree: [{
        'date': '2.30',
        'proj': '步行10公里',
        'change': '+10'
      }, {
        'date': '3.32',
        'proj': '长跑5公里',
        'change': '+15'
      }, {
        'date': '4.31',
        'proj': '步行10公里',
        'change': '+10'
      }]
    })
    db.collection('person_message').doc('19762d645eae6142004ed6e32b6e4da4').get({
      success: res => {
        that.setData({
          score: res.data._score
        })
      }
    })
    //这里你要加个初始化join的
    db.collection('sport').where({
        _openid: app.appData.user_openid
      })
      .get({
        success: res => {
          // console.log(res.data)
          that.setData({
            my_release_detail: res.data
          })
        }
      })
    db.collection('Participate').where({
        _openid: app.appData.user_openid
      })
      .get({
        success: res => {
          // console.log(res.data)
          that.setData({
            my_join_detail: res.data
          })
        }
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
  onShow: function(options) {
    this.onLoad()
    db.collection('person_message').doc('19762d645eae6142004ed6e32b6e4da4').get({
      success: res => {
        that.setData({
          score: res.data._score
        })
        console.log('成功更新')
      }
    })
    console.log('切换成功')
    console.log(app.appData.user_openid)
    this.getWindowHeight();
  },
  register: async function (e) {
    var that = this
    that.getOpenid()
    db.collection('account_info').where({
      _openid: that.data.openid
    }).get({
      success: res => {
        if (res.data.length != '0') {
          console.log('已经注册')
        }else{
          setTimeout(function () {
            db.collection('account_info').add({
              data: {
                avatar: that.data.AvatarUrl,
                nickName: that.data.username,
                //nickName is preserved to fill as the nickName of WeChat
                //However, to get the user's nickName
                //wx.login() is needed.
                //So it is left same as realName now.
                score: 0,
              },
              success: res => {
                console.log(app.appData.user_openid)
              },
              catch: res => {
                wx.showToast({
                  title: '网络繁忙，请稍后再试',
                  icon: 'none'
                })
              }
            })
          }, 500);
        }
      }
    })
  },
  /** 
   * 获取用户设备屏幕高度
   */
  getWindowHeight: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        var statusBarHeight = res.statusBarHeight;
        var titleBarHeight;
        // 确定titleBar高度（区分安卓和苹果
        if (wx.getSystemInfoSync().system.indexOf('iOS') > -1) {
          titleBarHeight = 44
        } else {
          titleBarHeight = 48
        }
        windowHeight = res.windowHeight - statusBarHeight - titleBarHeight
        // console.log('windowHeight: ' + res.windowHeight)
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          statusBarHeight: statusBarHeight,
          titleBarHeight: titleBarHeight,
          mapHeight: windowHeight - 32,
        })
      },
    })
  },
  onClose() {
    console.log('详情页关闭')
    this.setData({
      pop_detail_release: false,
      pop_detail_join: false,
      
      pop_btn_in: false,
      pop_btn_start: false,
    })
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
    getApp().globalData.userInfo=e.detail.userInfo;
    that.getOpenid()
  },
  /**
   * 长按用户头像管理员登录，进入后台界面
   */
  longpress: function (e) {
    wx.navigateTo({
      url: '../login/login'
    })
  }
})