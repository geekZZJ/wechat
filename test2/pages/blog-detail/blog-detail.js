// pages/blog-detail/blog-detail.js
let comments = require('../../data/comment-data')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let blogId = options.id
    this.setData({
      comments: comments.commentList
    })
    this.pageDetail(blogId)
  },

  //文章详情
  pageDetail: function(id) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/blog/' + id,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if (res.data.code === '0000') {
          that.setData({
            blogDetail: res.data.data
          })
        } else {
          wx.showToast({
            title: '请求失败',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
        }
      }
    })
  },

  //站外跳转
  jump: function(event) {
    let url = event.target.dataset.url
    wx.navigateTo({
      url: "../web-view/web-view?url=" + url
    })
  },

  //锚点功能
  commit: function(event) {
    wx.pageScrollTo({
      selector: '#commit',
      duration: 300
    })
  },

  // 点赞功能
  fixLike: function(event) {
    let temp = 'blogDetail.like'
    let like = this.data.blogDetail.like
    like = !like
    //向后台发送点赞数据未做
    this.setData({
      [temp]: like
    })
  },

  // 点击收藏
  fixCollection: function(event) {
    let temp = 'blogDetail.collected'
    let collected = this.data.blogDetail.collected
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

  //关注作者
  lookAuthor: function(event) {
    console.log("关注作者")
  },

  //跳转去评论
  onCommit: function(event) {
    wx.navigateTo({
      url: "../commit/commit"
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