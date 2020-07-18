// pages/release/release.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    intro: "",
    detail: "",
    picture:"",
    imgUrl:"",
    kind: "球类",
    peopleColumns: ['1-5人', '6-10人', '10-20人', '20人以上'],
    gradeColumns: ['易', '中', '难'],
    showTime: false,
    calendar: [],
    width: 0,
    current_item: 0,
    currentIndex: 0,
    currentTime: 0,
    timeArr: [{
      "time": "8:00-10:00",
      "status": "约满"
    }, {
      "time": "10:00-12:00",
      "status": "约满"
    }, {
      "time": "12:00-14:00",
      "status": "未满"
    }, {
      "time": "14:00-16:00",
      "status": "约满"
    }, {
      "time": "16:00-18:00",
      "status": "约满"
    }, {
      "time": "18:00-20:00",
      "status": "约满"
    }, {
      "time": "20:00-22:00",
      "status": "约满"
    }, {
      "time": "22:00-24:00",
      "status": "约满"
    }, ],
    //发起运动的文字内容
    toView: '',
    listItem: ["难", "中", "易"],
    show: false,
    text: ["一段文字一段文字一段文字一段文字", "一段文字一段文字一段文字一段文字", "一段文字一段文字一段文字一段文字"],
    //状态栏高度
    windowHeight: 0,
    windowWidth: 0,
    //列表中体育项目
    sportkinds: ["球类", "田径", "武术", "游泳", "健美操", "滑雪", "自行车", "登山", "击剑", "轮滑", "拔河", "瑜伽", "棋类", "跆拳道"],
    value1: 0,
    value2: 'a'
  },

  kind_select: function(e) {
    this.setData({
      kind: e.currentTarget.dataset.kind,
      current_item: e.currentTarget.dataset.key,
      showKind: false
    })
  },
  submit: function(e) {
    console.log('click submit')
    var that = this
    that.setData({
      loading: true
    })
    let postData = {
      _sport_title: that.data.title,
      _introduction: that.data.intro,
      _introduction_detail: that.data.detail,
      _picture:that.data.imgUrl[0],
    }
    // 检查是否所有必需信息已填
    if (postData._sport_title == "" ||
      postData._introduction == "" ||
      postData._introduction_detail == "" ||
      postData._picture == "") {
      wx.showToast({
        title: '请填写必要信息',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        loading: false
      })
      return
    }
    setTimeout(function() {
      that.setData({
        loading: false
      })
      db.collection('match').add({
        data: postData,
        success: res => {
          console.log("成功添加运动信息！")
        }
      })
      wx.showToast({
        title: '提交成功', //提示文字
        duration: 1000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'success', //图标，支持"success"、"loading"  
        success: function() {
          setTimeout(function() {
            wx.reLaunch({
              url: '/pages/match/match',
            })
          }, 1000)
        }
      })
    }, 1000)
  },
  create:function(e){
    console.log('in create')
    db.collection('match').where({
      _sport_title: that.data.title,
      _introduction: that.data.intro,
      _introduction_detail: that.data.detail,
      _picture:that.data.imgUrl[0],
    }).get({
      success:res=>{
        console.log(res)
        wx.cloud.callFunction({
          name: "create",
          data:{
             name:res.data[0]._id
            },
          success(res) {
            console.log('创建成功',res.data[0]._id)
          },
          fail(res) {
            console.log('创建失败',res.data[0]._id)
          }
        })
      }
    })
  },
  inputKind(e) {
    // this.data.error.title = e.detail == "" ? true : false
    this.setData({
      error: this.data.error,
      addkind: e.detail
    })
  },
  inputTitle(e) {
    // this.data.error.title = e.detail == "" ? true : false
    this.setData({
      error: this.data.error,
      title: e.detail
    })
  },
  inputAuthor(e) {
    // this.data.error.author = e.detail == "" ? true : false
    this.setData({
      error: this.data.error,
      author: e.detail
    })
  },
  inputIntro(e) {
    // this.data.error.intro = e.detail == "" ? true : false
    this.setData({
      error: this.data.error,
      intro: e.detail
    })
  },
  inputDetail(e) {
    // this.data.error.detail = e.detail == "" ? true : false
    this.setData({
      error: this.data.error,
      detail: e.detail
    })
  },
  setlocation: function() {
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
  toView: function() {
    this.setData({
      toView: view,
    })
  },
  selectlevel: function(e) {
    let i = e.currentTarget.dataset.index
    this.setData({
      level: this.data.listItem[i]
    })
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onPickLocation() {
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {}
          })
        }
        wx.chooseLocation({
          success: res => {
            console.log(res.name)
            console.log(res.address)
            console.log(res.latitude)
            console.log(res.longitude)
            that.setData({
              location: res.name
            })
          },
          fail: res => {
            console.log(res)
          },
          complete: res => {
            console.log('chooseLocation complete')
            console.log(res)
          }
        })
      },
      fail: res => {
        console.log(res)
      },
      complete: res => {
        console.log('click get location')
      }
    })
  },
  showPlus(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hidePlus(e) {
    this.setData({
      addkind: null,
      modalName: null
    })
  },
  addPlus(e) {
    var _this = this;
    var sportkinds = _this.data.sportkinds;
    var addkind = _this.data.addkind;
    sportkinds.push(addkind);
    console.log('fuck'+sportkinds.length)
    this.setData({
      kind: addkind,
      current_item:sportkinds.length-1,
      showKind: false,
    })
    this.setData({
      addkind: null,
      modalName: null,
      sportkinds: sportkinds,
    })
    this.onLoad()
  },
  onPickTime() {
    this.setData({
      showTime: true
    });
  },
  onPickPeople() {
    this.setData({
      showPeople: true
    })
  },
  onPickKind() {
    this.setData({
      showKind: true
    })
  },
  onPickGrade() {
    this.setData({
      showGrade: true
    })
  },
  onConfirmPeople(e) {
    this.setData({
      people: e.detail.value,
      showPeople: false
    })
  },
  onConfirmKind(e) {
    this.setData({
      kind: e.detail.value,
      showKind: false
    })
  },
  onConfirmGrade(e) {
    this.setData({
      grade: e.detail.value,
      showGrade: false
    })
  },
  onConfirmTime(e) {
    this.setData({
      time: '2020/5/5/8:00-10:00',
      showTime: false,
    })
  },
  onClose() {
    this.setData({
      showPeople: false,
      showGrade: false,
      showTime: false,
      showKind: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    function getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    }
    // 计算每月第一天是星期几
    function getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    }
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_date = date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    //利用构造函数创建对象
    console.log(date);
    var monthLength = getThisMonthDays(cur_year, cur_month)

    function calendar(date, week) {
      if (i > monthLength) {
        this.date = cur_year + '-' + (parseInt(cur_month) + 1) + '-' + date % monthLength;
      } else {
        this.date = cur_year + '-' + cur_month + '-' + date;
      }
      if (date == cur_date) {
        this.week = "今天";
      } else if (date == cur_date + 1) {
        this.week = "明天";
      } else {
        this.week = '星期' + week;
      }
    }
    //当前月份的天数

    //当前月份的第一天是星期几
    var week = getFirstDayOfWeek(cur_year, cur_month)
    var x = week;
    for (var i = 1; i <= monthLength + 7; i++) {
      //当循环完一周后，初始化再次循环
      if (x > 6) {
        x = 0;
      }
      //利用构造函数创建对象
      that.data.calendar[i] = new calendar(i, [weeks_ch[x]][0])
      x++;
    }
    //限制要渲染的日历数据天数为7天以内（用户体验）
    var flag = that.data.calendar.splice(cur_date, 7)
    that.setData({
      calendar: flag
    })
    //设置scroll-view的子容器的宽度
    that.setData({
      width: 186 * parseInt(7)
    })
    // console.log(app.globalData)
    wx.getSystemInfo({
      success: function(res) {
        console.log('windowHeight: ' + res.windowHeight)
        console.log('windowWidith: ' + res.windowWidth)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  select: function(event) {
    //为上半部分的点击事件
    this.setData({
      currentIndex: event.currentTarget.dataset.index
    })
  },
  selectTime: function(event) {
    //为下半部分的点击事件
    var that = this
    this.setData({
      currentTime: event.currentTarget.dataset.tindex
    })
    setTimeout(function() {
      that.setData({
        time: that.data.calendar[that.data.currentIndex].date + '/' + that.data.timeArr[that.data.currentTime].time
      })
    }, 500)
  },
  //上传图片
  doUpload:function(){
    //选择图片
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType:['compressed'],
      sourceType:['album','camera'],
      success:function(res){
        wx.showLoading({
          title: '上传中',
        })
        const filePath=res.tempFilePaths;
        that.setData({
          imgUrl:filePath
        })
        const cloudPath = [];
        filePath.forEach((item,i)=>{
          cloudPath.push(that.data.count+'_'+i+filePath[i].match(/\.[^.]+?$/)[0])
        })
        console.log(cloudPath)
        filePath.forEach((item,i)=>{
          wx.cloud.uploadFile({
            cloudPath:cloudPath[i],
            filePath:filePath[i],
            success:res=>{
              console.log('[上传文件]成功：',cloudPath,res)
              app.globalData.fileID=res.fileID
              app.globalData.cloudPath=cloudPath
              app.globalData.imagePath=filePath
            },
            fail:e=>{
              console.error('[上传文件]失败：',e)
              wx.showToast({
                title: '上传失败',
                icon:'none',
              })
            },
            complete:()=>{
              that.setData({
                picture:"已上传"
              }),
              wx.hideLoading()
            }
          })
        })
      },
      fail:e=>{
        console.error(e)
      }
    })
  }
})