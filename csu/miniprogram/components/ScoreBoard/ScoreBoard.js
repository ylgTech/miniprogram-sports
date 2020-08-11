Component({
  properties: {
    score: {
      type: Number,
      value: 0,
    }
  },

  data: {
    logs: []
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getTop3()
    },
    moved: function () {},
    detached: function () {},
  },

  methods: {
    getTop3() {
      let that = this
      const db = wx.cloud.database()
      const user_id = getApp().globalData.user_id
      db.collection('Score').where({
        user_id: user_id
      }).orderBy('time', 'desc').limit(3).field({
        score: true,
        time: true,
        activity_name: true
      }).get({
        success: res => {
          res.data.forEach(entry => entry.time = entry.time.substring(5))
          that.setData({
            logs: res.data
          })
        },
        fail: res => {
          console.log(res)
        }
      })
    },

    detail() {
      if (this.data.logs && this.data.logs.length != 0) {
        wx.navigateTo({
          url: '../../pages/score-history/score-history',
        })
      } else {
        wx.switchTab({
          url: '../../pages/index/index',
        })
      }
    }
  }

})