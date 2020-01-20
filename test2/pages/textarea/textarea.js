// pages/textarea/textarea.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxlength: 30,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindTextArea: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  save: function(event) {
    if (this.data.content) {
      //向后台发送数据
      wx.showToast({
          title: '保存成功',
          duration: 1000,
          icon: "success"
      })
      wx.navigateBack({
          url: '../my-info/my-info'
      })
    } else {
      wx.showToast({
        title: '签名字数应在1-30之间',
        duration: 2000,
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