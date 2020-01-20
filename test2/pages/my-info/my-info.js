// pages/my-info/my-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderArr: ['男', '女'],
    index: 0,
    birthday: '2020-01-01',
    customItem: '全部',
    region: ['广东省', '广州市', '海珠区'],
    sign: '无'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, "0")
    let day = (date.getDate()).toString().padStart(2, "0")
    let curDate = `${year}-${month}-${day}`
    this.setData({
      birthday: curDate
    })
  },
  genderPicker: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  sign: function() {
    wx.navigateTo({
      url: '../textarea/textarea'
    })
  },
  updateInfo: function(event) {
    console.log("更新")
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