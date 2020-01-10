// pages/hot/hot-detail/hot-detail.js
let hotData = require('../../../data/hot-data')
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
    let hotId = options.id
    let hotDetail = hotData.hotList[hotId]
    this.setData({
      hotDetail: hotDetail
    })
  },

  // 点赞功能
  fixLike: function(event) {
    let temp = 'hotDetail.like'
    let like = this.data.hotDetail.like
    like = !like
    //向后台发送收藏数据未做
    this.setData({
      [temp]: like
    })
  },

  // 点击收藏
  fixCollection: function(event) {
    let temp = 'hotDetail.collected'
    let collected = this.data.hotDetail.collected
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