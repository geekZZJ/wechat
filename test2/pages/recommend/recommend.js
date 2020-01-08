// pages/recommend/recommend.js
let hotData = require('../../data/hot-data')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      contents: hotData.hotList
    })
  },
  //实现页面跳转
  onRecTap: function(event) {
    let hotId = event.currentTarget.dataset.hotid
    wx.navigateTo({
      url: "./recommend-detail/recommend-detail?id=" + hotId
    })
  },
  //实现点赞，取消点赞
  onCollectionTap: function(event) {
    let hotId = event.currentTarget.dataset.hotid
    let temp = 'contents[' + hotId + '].collected'
    let collected = this.data.contents[hotId].collected
    collected = !collected
    //向后台发送收藏数据未做
    this.setData({
      [temp]: collected
    })
    wx.showToast({
      title: collected ? "收藏成功" : "取消收藏",
      duration: 1000,
      icon: "success"
    })
  },

  //大家都在看
  allLook: function(event) {
    let self = this
    console.log("大家都在看")
    wx.request({
      url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0',
      data: {},
      header: {
        "content-type": "application/xml"
      },
      method: 'get',
      success: function(res) {
        self.setData({
          blog: res.data
        })
      }
    })
  },

  //你可能喜欢
  maybe: function(event) {
    console.log("你可能喜欢")
  },

  //你可能喜欢
  change: function(event) {
    console.log("换一换")
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