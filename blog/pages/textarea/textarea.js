// pages/textarea/textarea.js
const app = getApp()

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
    this.setData({
      content: options.sign
    })
  },

  //获取输入框中的值
  bindTextArea: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  //保存用户签名
  save: function(event) {
    let that = this
    if (this.data.content) {
      //向后台发送数据
      wx.request({
        url: app.globalData.host + '/xhblog/user/sign',
        method: "PUT",
        data: {
          'sign': this.data.content
        },
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            var pages = getCurrentPages()
            var prevPage = pages[pages.length - 2]
            prevPage.setData({
              sign: that.data.content
            })
            wx.navigateBack({
              url: '../my-info/my-info'
            })
          } else {
            wx.showToast({
              title: '保存失败',
              duration: 1000,
              image: '/images/icon/xxx.png'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '签名字数应在1-30之间',
        duration: 2000,
        icon: "none"
      })
    }
  }
})