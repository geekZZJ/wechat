// pages/search/search.js
const app = getApp()

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
    this.initHot()
  },

  initHot: function(event) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/search/hot',
      method: "GET",
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          that.setData({
            keywords: res.data.data
          })
        } else {
          wx.showToast({
            title: '热搜获取失败',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
        }
      }
    })
  },

  initHistory: function(event) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/search/recent',
      method: "GET",
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          that.setData({
            history: res.data.data
          })
        } else {
          wx.showToast({
            title: '历史记录获取失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
    })
  },

  clearAll: function(event) {
    let that = this
    //发送请求未做
    wx.request({
      url: app.globalData.host + '/xhblog/search/all',
      method: "DELETE",
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          that.setData({
            history: ''
          })
        } else {
          wx.showToast({
            title: '清空失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
    })
  },

  clearContent: function(event) {
    this.setData({
      searchInput: '',
      isShow: false
    })
  },

  //热搜
  hotSearch: function(event) {
    let keyword = event.target.dataset.keyword
    wx.navigateTo({
      url: "../search-content/search-content?formdata=" + keyword
    })
  },

  //根据历史查找
  historySearch: function(event) {
    let history = event.target.dataset.history
    wx.navigateTo({
      url: "../search-content/search-content?formdata=" + history
    })
  },

  //删除该条历史记录
  closeHistory: function(event) {
    let that = this
    let content = event.target.dataset.content
    let history = this.data.history
    let tempId = 0
    for (let i = 0; i < history.length; i++) {
      if (history[i].content === content) {
        tempId = i
      }
    }
    //发送后台请求
    wx.request({
      url: app.globalData.host + '/xhblog/search/content',
      method: "DELETE",
      data: {
        'content': content
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          history.splice(tempId, 1)
          that.setData({
            history: history
          })
        } else {
          wx.showToast({
            title: '删除失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
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
        searchInput: '',
        isShow: false
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //请求历史记录
    this.initHistory()
  }
})