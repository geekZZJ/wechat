// pages/blog-detail/blog-detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let blogId = options.id
    this.setData({
      blogId: blogId
    })
    this.pageDetail(blogId)
  },

  //文章详情
  pageDetail: function(id) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/blog/' + id,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          that.setData({
            blogDetail: res.data.data
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
  },

  //博客评论
  blogComment: function(id) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/comment/blog/' + id,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          let len = res.data.data.length
          let hotcomment = {
            blogId: id,
            length: len
          }
          that.setData({
            comments: res.data.data
          })
          wx.setStorage({
            key: "hotcomment",
            data: hotcomment
          })
        } else {
          wx.showToast({
            title: '评论获取失败',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
        }
      }
    })
  },

  //站外跳转
  jump: function(event) {
    let url = event.target.dataset.url
    wx.navigateTo({
      url: "../web-view/web-view?url=" + url
    })
  },

  //锚点功能
  commit: function(event) {
    wx.pageScrollTo({
      selector: '#commit',
      duration: 300
    })
  },

  // 点赞/取消点赞功能
  fixLike: function(event) {
    let blogId = event.currentTarget.dataset.blogid
    let isPraise = this.data.blogDetail.isPraise
    let that = this
    if (isPraise === null) {
      //向后台发送点赞数据
      wx.request({
        url: app.globalData.host + '/xhblog/praise/save',
        method: "GET",
        data: {
          'blogId': blogId
        },
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            let temp = 'blogDetail.isPraise'
            that.setData({
              [temp]: 1
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
    } else {
      //取消点赞
      wx.request({
        url: app.globalData.host + '/xhblog/praise/deleted',
        method: "GET",
        data: {
          'blogId': blogId
        },
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            let temp = 'blogDetail.isPraise'
            that.setData({
              [temp]: null
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
  },

  // 点击收藏
  fixCollection: function(event) {
    let blogId = event.currentTarget.dataset.blogid
    let isFavorite = this.data.blogDetail.isFavorite
    let that = this
    if (isFavorite === null) {
      //向后台发送收藏数据
      wx.request({
        url: app.globalData.host + '/xhblog/favorite/save',
        method: "POST",
        data: {
          'blogId': blogId
        },
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            let temp = 'blogDetail.isFavorite'
            let hotdata = {
              blogId: blogId,
              isFavorite: 1
            }
            that.setData({
              [temp]: 1
            })
            wx.showToast({
              title: "收藏成功",
              duration: 1000,
              icon: "success"
            })
            wx.setStorage({
              key: "hotdata",
              data: hotdata
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
        url: app.globalData.host + '/xhblog/favorite/blog/' + blogId,
        method: "DELETE",
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            let temp = 'blogDetail.isFavorite'
            let hotdata = {
              blogId: blogId,
              isFavorite: null
            }
            that.setData({
              [temp]: null
            })
            wx.showToast({
              title: "取消收藏",
              duration: 1000,
              icon: "success"
            })
            //实现页面间通信
            wx.setStorage({
              key: "hotdata",
              data: hotdata
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

  //关注/取消关注作者
  lookAuthor: function(event) {
    let blogerId = event.currentTarget.dataset.blogerid
    let isFollow = this.data.blogDetail.isFollow
    let that = this
    if (isFollow === 1) {
      //取消关注该作者
      wx.request({
        url: app.globalData.host + '/xhblog/follow/bloger/' + blogerId,
        method: "DELETE",
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            let temp = 'blogDetail.isFollow'
            that.setData({
              [temp]: null
            })
          } else {
            wx.showToast({
              title: '取消失败',
              duration: 1000,
              icon: "none"
            })
          }
        }
      })
    } else {
      //关注该作者
      wx.request({
        url: app.globalData.host + '/xhblog/follow/save',
        method: "POST",
        data: {
          'blogerId': blogerId
        },
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code === '0000') {
            let temp = 'blogDetail.isFollow'
            that.setData({
              [temp]: 1
            })
          } else {
            wx.showToast({
              title: '关注失败',
              duration: 1000,
              icon: "none"
            })
          }
        }
      })
    }
  },

  //跳转去评论
  onCommit: function(event) {
    let blogId = event.currentTarget.dataset.blogid
    wx.navigateTo({
      url: "../commit/commit?id=" + blogId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.blogComment(this.data.blogId)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})