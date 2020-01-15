// pages/choose/choose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    tag1: true,
    tag2: true,
    tag3: true,
    tag4: true,
    tag5: true,
    tag6: true,
    tag7: true,
    tag8: true,
    tag9: true,
    tag10: true,
    tag11: true,
    tag12: true,
    tag13: true,
    tag14: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onTagTap1: function(event) {
    let tag1 = this.data.tag1
    tag1 = !tag1
    this.setData({
      tag1: tag1
    })
  },
  onTagTap2: function(event) {
    let tag2 = this.data.tag2
    tag2 = !tag2
    this.setData({
      tag2: tag2
    })
  },
  onTagTap3: function(event) {
    let tag3 = this.data.tag3
    tag3 = !tag3
    this.setData({
      tag3: tag3
    })
  },
  onTagTap4: function(event) {
    let tag4 = this.data.tag4
    tag4 = !tag4
    this.setData({
      tag4: tag4
    })
  },
  onTagTap5: function(event) {
    let tag5 = this.data.tag5
    tag5 = !tag5
    this.setData({
      tag5: tag5
    })
  },
  onTagTap6: function(event) {
    let tag6 = this.data.tag6
    tag6 = !tag6
    this.setData({
      tag6: tag6
    })
  },
  onTagTap7: function(event) {
    let tag7 = this.data.tag7
    tag7 = !tag7
    this.setData({
      tag7: tag7
    })
  },
  onTagTap8: function(event) {
    let tag8 = this.data.tag8
    tag8 = !tag8
    this.setData({
      tag8: tag8
    })
  },
  onTagTap9: function(event) {
    let tag9 = this.data.tag9
    tag9 = !tag9
    this.setData({
      tag9: tag9
    })
  },
  onTagTap10: function(event) {
    let tag10 = this.data.tag10
    tag10 = !tag10
    this.setData({
      tag10: tag10
    })
  },
  onTagTap11: function(event) {
    let tag11 = this.data.tag11
    tag11 = !tag11
    this.setData({
      tag11: tag11
    })
  },
  onTagTap12: function(event) {
    let tag12 = this.data.tag12
    tag12 = !tag12
    this.setData({
      tag12: tag12
    })
  },
  onTagTap13: function(event) {
    let tag13 = this.data.tag13
    tag13 = !tag13
    this.setData({
      tag13: tag13
    })
  },
  onTagTap14: function(event) {
    let tag14 = this.data.tag14
    tag14 = !tag14
    this.setData({
      tag14: tag14
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