// pages/post-detail/index.js
import {
  postList
} from "../../data/post"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: false,
    isPlaying: false,
    mgr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = postList[parseInt(options.pid)]
    this.setData({
      postData,
      isPlaying: app.globalData.isPlayingMusic
    })
    this.getCollected()
    const mgr = wx.getBackgroundAudioManager()
    this.data.mgr = mgr
    this.data.mgr.onPlay(this.onMusicStart)
    // this.data.mgr.onStop(this.onMusicStop)
    this.data.mgr.onPause(this.onMusicStop)
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
    const {
      url,
      title,
      coverImg
    } = this.data.postData.music
    this.data.mgr.src = url
    this.data.mgr.title = title
    this.data.mgr.coverImgUrl = coverImg
    app.globalData.isPlayingMusic = true
    this.setData({
      isPlaying: true
    })
  },

  onMusicStop() {
    this.data.mgr.stop()
    app.globalData.isPlayingMusic = false
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