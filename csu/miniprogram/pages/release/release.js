// pages/release/release.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peopleColumns: ['1-5人', '6-10人', '10-20人', '20人以上'],
    gradeColumns: ['易', '中', '难'],
    showTime: false,
    calendar: [],
    width: 0,
    kind:'',
    current_item:0,
    time:'',
    currentIndex: 0,
    currentTime: 0,
    timeArr: [{ "time": "8:00-10:00", "status": "约满" }, { "time": "10:00-12:00", "status": "约满" }, { "time": "12:00-14:00", "status": "未满" }, { "time": "14:00-16:00", "status": "约满" },  { "time": "16:00-18:00", "status": "约满" }, { "time": "18:00-20:00", "status": "约满" }, { "time": "20:00-22:00", "status": "约满" }, { "time": "22:00-24:00", "status": "约满" },  ],
    location: '',
    level:'选择等级',
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
    option1: [{
        text: '全部商品',
        value: 0
      },
      {
        text: '新款商品',
        value: 1
      },
      {
        text: '活动商品',
        value: 2
      }
    ],
    option2: [{
        text: '默认排序',
        value: 'a'
      },
      {
        text: '好评排序',
        value: 'b'
      },
      {
        text: '销量排序',
        value: 'c'
      }
    ],
    value1: 0,
    value2: 'a'
  },

  kind_select:function(e){
    this.setData({
      kind: e.currentTarget.dataset.kind,
      current_item: e.currentTarget.dataset.key
    })
  },
  submit: function (e) {
    var that = this
    that.setData({
      loadingHidden: false
    })
    setTimeout(function () {
      that.setData({
        loadingHidden: true
      })
      db.collection('sport').add({
        data: {
          _sport_title: that.data.sport_title,
          _introduction: that.data.introduction,
          _name: that.data.name,
          _number: that.data.number,
          _introduction_detail:'5.10号晚19点在南校操场集合跑步',
          _destination:'南校操场',
          _time: that.data.time,
          _kind: that.data.kind,
        },
        success: res => {
          console.log("成功添加运动信息！")

        }
      })
      wx.showToast({
        title: '提交成功', //提示文字
        duration: 1000, //显示时长
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
        icon: 'success', //图标，支持"success"、"loading"  
        success: function () {
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }, 1000)
        }, //接口调用成功
        fail: function () { }, //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
      })
      

    }, 1000)
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
  selectlevel: function (e) {
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
      showTime: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      success: function (res) {
        console.log('windowHeight: ' + res.windowHeight)
        console.log('windowWidith: ' + res.windowWidth)
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  select: function (event) {
    //为上半部分的点击事件
    this.setData({
      currentIndex: event.currentTarget.dataset.index
    })
  },
  selectTime: function (event) {
    //为下半部分的点击事件
    var that = this
    this.setData({
      currentTime: event.currentTarget.dataset.tindex
    })
    setTimeout(function () {
      that.setData({
        time:that.data.calendar[that.data.currentIndex].date + '/' + that.data.timeArr[that.data.currentTime].time
      })
    },500)
  },
})