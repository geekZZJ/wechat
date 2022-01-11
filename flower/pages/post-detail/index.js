// pages/post-detail/index.js
import {
  postList
} from "../../data/post"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    isPlaying: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = postList[parseInt(options.pid)]
    this.setData({
      postData
    })
    this.getCollected()
  },

  onCollect() {
    const data = wx.getStorageSync('posts_collected') || {}
    data[this.data.postData.postId] = !this.data.collected
    wx.setStorageSync('posts_collected', data)
    this.setData({
      collected: !this.data.collected
    })
    if (this.data.collected) {
      wx.showToast({
        title: '收藏成功',
        duration: 1000
      })
    }
  },

  async onShare() {
    const result = await wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微信']
    })
    console.log(222, result)
  },

  // 读取缓存
  getCollected() {
    const data = wx.getStorageSync('posts_collected') || {}
    const collected = data[this.data.postData.postId]
    this.setData({
      collected
    })
  },

  onMusicStart() {
    const mgr = wx.getBackgroundAudioManager()
    const {
      url,
      title,
      coverImg
    } = this.data.postData.music
    mgr.src = url
    mgr.title = title
    mgr.coverImgUrl = coverImg
    this.setData({
      isPlaying: true
    })
  },

  onMusicStop() {
    const mgr = wx.getBackgroundAudioManager()
    mgr.stop()
    this.setData({
      isPlaying: false
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