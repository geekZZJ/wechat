// pages/recommend/recommend.js
const app = getApp()
let isInitSelfShow = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
  },

  //获取初始信息,你可能会喜欢
  init: function(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/recommend/user',
      method: "GET",
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code === '0000') {
          that.setData({
            contents: res.data.data
          })
        } else {
          wx.showToast({
            title: '获取推荐列表失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
    })
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
    let that = this
    let BlogId = event.currentTarget.dataset.blogid
    let tempId = 0
    for (let i = 0; i < this.data.contents.length; i++) {
      if (this.data.contents[i].id === BlogId) {
        tempId = i
      }
    }
    let isFavorite = this.data.contents[tempId].isFavorite
    if (isFavorite === null) {
      //向后台发送收藏数据
      wx.request({
        url: app.globalData.host + '/xhblog/favorite/save',
        method: "POST",
        data: {
          'blogId': BlogId
        },
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            let temp = 'contents[' + tempId + '].isFavorite'
            that.setData({
              [temp]: 1
            })
            wx.showToast({
              title: "收藏成功",
              duration: 1000,
              icon: "success"
            })
          } else {
            wx.showToast({
              title: '收藏失败',
              duration: 1000,
              icon: "none"
            })
          }
        }
      })
    } else {
      //取消收藏
      wx.request({
        url: app.globalData.host + '/xhblog/favorite/blog/' + BlogId,
        method: "DELETE",
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            let temp = 'contents[' + tempId + '].isFavorite'
            that.setData({
              [temp]: null
            })
            wx.showToast({
              title: "取消收藏",
              duration: 1000,
              icon: "success"
            })
          } else {
            wx.showToast({
              title: '取消收藏失败',
              duration: 1000,
              icon: "none"
            })
          }
        }
      })
    }
  },

  //大家都在看
  allLook: function(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    this.setData({
      status: 0
    })
    wx.request({
      url: app.globalData.host + '/xhblog/recommend/user/other',
      method: "GET",
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code === '0000') {
          that.setData({
            contents: res.data.data
          })
        } else {
          wx.showToast({
            title: '获取推荐列表失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
    })
  },

  //你可能喜欢
  maybe: function(event) {
    this.setData({
      status: 1
    })
    this.init()
  },

  //换一换
  change: function(event) {
    if (this.data.status === 1) {
      this.maybe()
      return
    }
    if (this.data.status === 0) {
      this.allLook()
      return
    }
  },

  //刷新收藏数据
  onRefreshHot: function(data) {
    if (data) {
      let id = data.blogId
      let value = data.isFavorite
      let tempId = 0
      for (let i = 0; i < this.data.contents.length; i++) {
        if (this.data.contents[i].id === id) {
          tempId = i
        }
      }
      let temp = 'contents[' + tempId + '].isFavorite'
      if (value === 1) {
        this.setData({
          [temp]: 1
        })
      } else {
        this.setData({
          [temp]: null
        })
      }
      // 清队上次通信数据
      wx.removeStorageSync('hotdata')
    } else {
      console.log('localStorage中无数据')
    }
  },

  //刷新评论数据
  onRefreshCom: function(data) {
    if (data) {
      let id = parseInt(data.blogId)
      let value = data.length
      let tempId = 0
      for (let i = 0; i < this.data.contents.length; i++) {
        if (this.data.contents[i].id === id) {
          tempId = i
        }
      }
      let temp = 'contents[' + tempId + '].commentCount'
      this.setData({
        [temp]: value
      })
      // 清队上次通信数据
      wx.removeStorageSync('hotcomment')
    } else {
      console.log('localStorage中无数据')
    }
  },

  //刷新热度数据
  onRefreshRead: function(data) {
    if (data) {
      let id = parseInt(data.blogId)
      let value = data.read
      let tempId = 0
      for (let i = 0; i < this.data.contents.length; i++) {
        if (this.data.contents[i].id === id) {
          tempId = i
        }
      }
      let temp = 'contents[' + tempId + '].hot'
      this.setData({
        [temp]: value
      })
      // 清队上次通信数据
      wx.removeStorageSync('readData')
    } else {
      console.log('localStorage中无数据')
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 页面初始化也会触发onShow，这种情况可能不需要检查通信
    if (isInitSelfShow) {
      return
    }

    let hotdata = wx.getStorageSync('hotdata')
    let hotcomment = wx.getStorageSync('hotcomment')
    let readData = wx.getStorageSync('readData')
    //刷新点赞信息
    this.onRefreshHot(hotdata)
    //刷新评论数据
    this.onRefreshCom(hotcomment)
    //刷新热度数据
    this.onRefreshRead(readData)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    isInitSelfShow = false
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    //发送请求
    wx.request({
      url: app.globalData.host + '/xhblog/recommend/user',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code === '0000') {
          console.log(res.data)
          let arr1 = that.data.contents
          let arr2 = res.data.data
          arr1 = arr1.concat(arr2)
          that.setData({
            contents: arr1
          })
        } else {
          wx.showToast({
            title: '请求失败',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
        }
      }
    })
  }
})