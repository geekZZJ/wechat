// pages/search/search.js
let hotSearch = require('../../data/hot-search')
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
    this.initHistory()
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
                  console.log(res.data)
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
    this.setData({
      history: ''
    })
    //发送请求未做
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
    let historyId = event.target.dataset.historyid
    let history = this.data.history
    let tempId = 0
    for (let i = 0; i < history.length; i++) {
      if (history[i].historyId === historyId) {
        tempId = i
      }
    }
    history.splice(tempId, 1)
    this.setData({
      history: history
    })
    //发送后台请求
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //请求历史记录
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

  }
})