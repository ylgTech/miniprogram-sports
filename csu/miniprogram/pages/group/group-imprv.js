// pages/group/group-imprv.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "GroupToShow": [{
            "SportTypeID": 2333,
            "SportTypeName": "马拉松",
            "LogoImageFix": "Marathon",
            "IsSelected": true
        }, {
            "SportTypeID": 1001,
            "SportTypeName": "滑板",
            "LogoImageFix": "Skateboard",
            "IsSelected": false
        }, {
            "SportTypeID": 1002,
            "SportTypeName": "跑步",
            "LogoImageFix": "Running",
            "IsSelected": false
        }, {
            "SportTypeID": 1003,
            "SportTypeName": "举重",
            "LogoImageFix": "WeightLifting",
            "IsSelected": false
        }, {
            "SportTypeID": 1004,
            "SportTypeName": "滑雪",
            "LogoImageFix": "Skating",
            "IsSelected": true
        }, {
            "SportTypeID": 1005,
            "SportTypeName": "骑行",
            "LogoImageFix": "Biking",
            "IsSelected": false
        }]
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

    },

    gotoGroupCollege: function (event) {
        wx.navigateTo({
            url: '/pages/group/group-select-college',
        })
    }
})