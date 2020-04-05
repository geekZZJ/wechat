// pages/subscribe/subscribe.js
const app = getApp()
let isInitSelfShow = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
  },

  //获取订阅信息
  init: function(event) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/blog/subscribe',
      method: "GET",
      data: {
        'pageSize': 20,
        'pageNo': this.data.pageNo
      },
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
            title: '订阅列表获取失败',
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

  //实现点赞，取消点赞
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

        }
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
      // 页面初始化也会触发onShow，这种情况可能不需要检查通信
      if (isInitSelfShow) return

      let hotdata = wx.getStorageSync('hotdata')
      let hotcomment = wx.getStorageSync('hotcomment')
      //刷新点赞信息
      this.onRefreshHot(hotdata)
      //刷新评论数据
      this.onRefreshCom(hotcomment)
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
    let pageNo = this.data.pageNo + 1
    this.setData({
      pageNo: pageNo
    })
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/blog/subscribe',
      data: {
        pageSize: 20,
        pageNo: this.data.pageNo
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          if (res.data.data.length > 0) {
            let arr1 = that.data.contents
            let arr2 = res.data.data
            arr1 = arr1.concat(arr2)
            that.setData({
              contents: arr1
            })
          } else {
            wx.showToast({
              title: '没有更多内容了',
              duration: 1000,
              icon: "none"
            })
          }
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