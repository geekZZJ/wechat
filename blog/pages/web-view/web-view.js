// pages/web-view/web-view.js
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
    let link = options.url
    this.setData({
      link: link
    })
  },

  loadSuccess: function(event) {
    console.log(event.detail)
  }
})