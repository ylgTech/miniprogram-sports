// pages/group/group-select-college.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "ReturnGroupCollegeNum": 5,
        "GroupCollegeList": [{
            "GroupID": 112233,
            "GroupName": "牛拉松",
            "CollegeID": 8208,
            "CollegeName": "计算机学院",
            "SportTypeID": 2333,
            "SportTypeName": "马拉松"
        }, {
            "GroupID": 113355,
            "GroupName": "Xeon E5",
            "CollegeID": 8208,
            "CollegeName": "计算机学院",
            "SportTypeID": 2333,
            "SportTypeName": "马拉松"
        }, {
            "GroupID": 100100,
            "GroupName": "燃烧吧甘油三酯！",
            "CollegeID": 1233,
            "CollegeName": "生物学院",
            "SportTypeID": 2333,
            "SportTypeName": "马拉松"
        }, {
            "GroupID": 100110,
            "GroupName": "萘基乙二胺盐酸盐",
            "CollegeID": 1233,
            "CollegeName": "化学院",
            "SportTypeID": 2333,
            "SportTypeName": "马拉松"
        }, {
            "GroupID": 114514,
            "GroupName": "走れ！",
            "CollegeID": 1688,
            "CollegeName": "外国语学院",
            "SportTypeID": 2333,
            "SportTypeName": "马拉松"
        }]
    },
  test_nav:function(e){
    wx.navigateTo({
      url: '../../pages/group-detail/group-detail',
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