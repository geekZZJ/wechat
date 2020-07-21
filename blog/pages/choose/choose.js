// pages/choose/choose.js
let techData = require('../../data/choose-data')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: true,
    finished: true,
    disabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      contents: techData.techList,
      blogs: techData.blogList
    })
  },

  //自定义多选按钮
  onTagTap: function(event) {
    let techid = event.currentTarget.dataset.techid
    let j = 0
    for (let i = 0; i < this.data.contents.length; i++) {
      if (this.data.contents[i].technologyId == techid) {
        if (this.data.contents[i].checked == true) {
          this.data.contents[i].checked = false
        } else {
          this.data.contents[i].checked = true
        }
      }
    }
    for (let i = 0; i < this.data.contents.length; i++) {
      if (this.data.contents[i].checked == true) {
        j++
      }
    }
    if (j > 0) {
      this.data.disabled = false
    } else {
      this.data.disabled = true
    }
    this.setData({
      contents: this.data.contents,
      disabled: this.data.disabled
    })
  },

  onBlog: function(event) {
    let blogid = event.currentTarget.dataset.blogid
    let j = 0
    for (let i = 0; i < this.data.blogs.length; i++) {
      if (this.data.blogs[i].blogId == blogid) {
        if (this.data.blogs[i].checked == true) {
          this.data.blogs[i].checked = false
        } else {
          this.data.blogs[i].checked = true
        }
      }
    }
    for (let i = 0; i < this.data.blogs.length; i++) {
      if (this.data.blogs[i].checked == true) {
        j++
      }
    }
    if (j > 0) {
      this.data.finished = false
    } else {
      this.data.finished = true
    }
    this.setData({
      blogs: this.data.blogs,
      finished: this.data.finished
    })
  },

  //点击发送感兴趣的技术标签
  chooseNext: function(event) {
    let arr = new Array()
    let that = this
    for (let i = 0; i < this.data.contents.length; i++) {
      if (this.data.contents[i].checked == true) {
        arr.push(this.data.contents[i].technologyId)
      }
    }
    //向服务器发送数据
    wx.request({
      url: app.globalData.host + '/xhblog/preferencetype/save',
      method: "POST",
      data: {
        'typeIdList': arr
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          //设置第二选项
          that.setData({
            first: false
          })
        } else {
          wx.showToast({
            title: '请求失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
    })
  },

  //点击发送常用的博客
  finished: function(event) {
    let arr = new Array()
    for (let i = 0; i < this.data.blogs.length; i++) {
      if (this.data.blogs[i].checked == true) {
        arr.push(this.data.blogs[i].blogId)
      }
    }
    //向服务器发送数据
    wx.request({
      url: app.globalData.host + '/xhblog/preferenceplat/save',
      method: "POST",
      data: {
        'platIdList': arr
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          //跳转到首页
          wx.switchTab({
            url: "../hot/hot"
          })
        } else {
          wx.showToast({
            title: '请求失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
    })
  }
})