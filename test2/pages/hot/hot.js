// pages/hot/hot.js
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

    //获取顶部高度
    try {
      const res = wx.getSystemInfoSync()
      // console.log(res.statusBarHeight)
      this.setData({
        view: {
          headerPT: res.statusBarHeight + 32,
          navMT: res.statusBarHeight + 92,
          posHeight: res.statusBarHeight + 231
        }
      })
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  },

  //实现页面跳转
  onBlogTap: function(event) {
    let blogId = event.currentTarget.dataset.blogid
    wx.navigateTo({
      url: "../blog-detail/blog-detail?id=" + blogId
    })
  },
  //轮播图跳转
  onSwiperTap: function(event) {
    let hotId = event.target.dataset.hotid
    wx.navigateTo({
      url: "../blog-detail/blog-detail?id=" + hotId
    })
  },
  //实现点赞，取消点赞
  onCollectionTap: function(event) {
    let BlogId = event.currentTarget.dataset.blogid
    let temp = 'contents[' + BlogId + '].collected'
    let collected = this.data.contents[BlogId].collected
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

  //点击跳到搜索页面
  search: function(event) {
    wx.navigateTo({
      url: "../search/search"
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