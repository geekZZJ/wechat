// pages/subscribe/subscribe.js
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
  onLoad: function (options) {
    this.setData({
        contents: hotData.hotList
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