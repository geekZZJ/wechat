// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInput: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  clearAll: function(event) {
    console.log("清空历史记录")
  },

  clearContent: function(event) {
    this.setData({
      searchInput: '',
      isShow: false
    })
  },

  //根据关键字查询
  search: function(event) {
    let formData = event.detail.value.trim()
    if (formData) {
      wx.navigateTo({
        url: "../search-content/search-content?formdata=" + formData
      })
      this.setData({
        searchInput: ''
      })
    } else {
      wx.showToast({
        title: "输入不能为空",
        duration: 1000,
        icon: "none"
      })
    }
  },

  //控制关闭icon显示隐藏
  controlClose: function(event) {
    let searchKey = event.detail.value
    if (searchKey) {
      this.setData({
        isShow: true,
        searchInput: searchKey
      })
    } else {
      this.setData({
        isShow: false
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