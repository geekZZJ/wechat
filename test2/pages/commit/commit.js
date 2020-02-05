// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    commit: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  //计算字数
  count: function(event) {
    this.setData({
      length: event.detail.value.length,
      commit: event.detail.value
    })
  },

  //提交评论
  onSubmit: function(event) {
    let commit = this.data.commit
    if (commit) {
      console.log(commit)
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.showToast({
        title: "评论内容没有填写",
        duration: 1500,
        icon: "none"
      })
    }
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