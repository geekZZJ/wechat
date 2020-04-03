//index.js
let isInitSelfShow = true

Page({
  data: {
    motto: 'Hello World'
  },

  onLoad: function() {

  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow() {
    // 页面初始化也会触发onShow，这种情况可能不需要检查通信
    if (isInitSelfShow) return;

    let newHello = wx.getStorageSync('test')

    if (newHello) {
      this.setData({
          motto: newHello
      })

      // 清队上次通信数据
      wx.clearStorageSync('test')
    }

  },
  onHide() {
    isInitSelfShow = false
  }
})