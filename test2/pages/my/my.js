// pages/my/my.js
let hotData = require('../../data/hot-data')
let blogerData = require('../../data/bloger-data')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection: true,
    subscribe: true,
    comment: true,
    history: true,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    isShow: false,
    subShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onCollection()
    this.setData({
      blogers: blogerData.blogerList
    })
  },

  //获取登录信息
  getInfo: function(event) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/user/message',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          that.setData({
            user: res.data.data
          })
        } else {
          wx.showToast({
            title: '用户信息获取失败',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
        }
      }
    })
  },

  //跳转去设置
  onSet: function(event) {
    wx.navigateTo({
      url: '../my-info/my-info'
    })
  },

  onCollection: function(event) {
    let that = this
    let i = this.data.i
    if (i < 1) {
      let collection = this.data.collection
      collection = !collection
      this.setData({
        collection: collection,
        subscribe: true,
        comment: true,
        history: true,
        subShow: true,
        i: ++i,
        j: 0,
        k: 0,
        l: 0
      })
        //向服务器请求收藏信息
        wx.request({
            url: app.globalData.host + '/xhblog/favorite/listbyuser',
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success(res) {
              console.log(res.data)
                if (res.data.code === '0000') {
                    that.setData({
                        contents: res.data.data
                    })
                } else {
                    wx.showToast({
                        title: '收藏列表获取失败',
                        duration: 1000,
                        image: '/images/icon/xxx.png'
                    })
                }
            }
        })
    } else {
      return
    }
  },
  onSubscribe: function(event) {
    let j = this.data.j
    if (j < 1) {
      let subscribe = this.data.subscribe
      subscribe = !subscribe
      this.setData({
        collection: true,
        subscribe: subscribe,
        comment: true,
        history: true,
        subShow: false,
        i: 0,
        j: ++j,
        k: 0,
        l: 0
      })
    } else {
      return
    }
  },
  onComment: function(event) {
    let k = this.data.k
    if (k < 1) {
      let comment = this.data.comment
      comment = !comment
      this.setData({
        collection: true,
        subscribe: true,
        comment: comment,
        history: true,
        subShow: true,
        i: 0,
        j: 0,
        k: ++k,
        l: 0
      })
    } else {
      return
    }
  },
  onHistory: function(event) {
    let l = this.data.l
    if (l < 1) {
      let history = this.data.history
      history = !history
      this.setData({
        collection: true,
        subscribe: true,
        comment: true,
        history: history,
        subShow: true,
        i: 0,
        j: 0,
        k: 0,
        l: ++l
      })
    } else {
      return
    }
    // 发送请求
  },

  //实现页面跳转
  onBlogTap: function(event) {
    let blogId = event.currentTarget.dataset.blogid
    wx.navigateTo({
      url: "../blog-detail/blog-detail?id=" + blogId
    })
  },

  //实现收藏，取消收藏
  onCollectionTap: function(event) {
    let BlogId = event.currentTarget.dataset.blogid
    let temp = 'contents[' + BlogId + '].collected'
    let collected = this.data.contents[BlogId].collected
    collected = !collected
    //向后台发送收藏数据未做


    this.setData({
      [temp]: collected
    })
    wx.showToast({
      title: collected ? "收藏成功" : "取消收藏",
      duration: 1000,
      icon: "success"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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

  }
})