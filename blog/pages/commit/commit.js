// pages/commit/commit.js
const app = getApp()

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
    let blogId = options.id
    this.setData({
      blogId: blogId
    })
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
    let commit = this.data.commit.trim()
    if (commit) {
      wx.request({
        url: app.globalData.host + '/xhblog/comment/save',
        method: "POST",
        data: {
          'blogId': this.data.blogId,
          'content': commit
        },
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.showToast({
              title: '评论失败',
              duration: 1000,
              icon: "none"
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: "评论内容没有填写",
        duration: 1500,
        icon: "none"
      })
    }
  }
})