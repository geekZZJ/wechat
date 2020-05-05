// pages/search-content/search-content.js
let app = getApp()
let isInitSelfShow = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    tag: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let formData = options.formdata
    this.setData({
      searchInput: formData,
      pageNo: 1
    })
    this.searchList(formData)
  },

  onTitleSearch: function(event) {
    this.setData({
      tag: 1
    })
    this.searchList(this.data.searchInput)
  },

  onBlogerSearch: function(event) {
    this.setData({
      tag: 2
    })
    this.searchBloger(this.data.searchInput)
  },

  //根据关键字查找
  searchList: function(formData) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/blog/search',
      data: {
        key: formData,
        pageSize: 20,
        pageNo: this.data.pageNo,
        tag: this.data.tag
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success(res) {
        console.log(res.data)
        if (res.data.code === '0000') {
          if (res.data.data === null) {
            that.setData({
              contents: []
            })
            wx.showToast({
              title: '无相关内容',
              duration: 1000,
              icon: "none"
            })
            return
          }
          if (res.data.data.length > 0) {
            that.setData({
              contents: res.data.data
            })
          } else {
            that.setData({
              contents: []
            })
            wx.showToast({
              title: '无相关内容',
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
  },

  //根据博主姓名查找
  searchBloger: function(formData) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/blog/search',
      data: {
        key: formData,
        pageSize: 20,
        pageNo: this.data.pageNo,
        tag: this.data.tag
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success(res) {
        console.log(res.data)
        if (res.data.code === '0000') {
          if (res.data.data.data.length > 0) {
            that.setData({
              blogers: res.data.data.data
            })
          } else {
            that.setData({
              blogers: []
            })
            wx.showToast({
              title: "无相关博主",
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
  },

  //跳转博主页面
  onBlogerTap: function(event) {
    let blogerId = event.currentTarget.dataset.blogerid
    wx.navigateTo({
      url: "../bloger/bloger?id=" + blogerId
    })
  },

  //根据关键字查询
  search: function(event) {
    let formData = event.detail.value.trim()
    if (formData) {
      this.setData({
        searchInput: formData
      })
      if (this.data.tag === 1) {
        this.searchList(formData)
      } else {
        this.searchBloger(formData)
      }
    } else {
      wx.showToast({
        title: "输入不能为空",
        duration: 1000,
        icon: "none"
      })
    }
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

  //实现页面跳转
  onBlogTap: function(event) {
    let blogId = event.currentTarget.dataset.blogid
    wx.navigateTo({
      url: "../blog-detail/blog-detail?id=" + blogId
    })
  },

  //控制关闭icon显示隐藏
  controlClose: function(event) {
    let searchKey = event.detail.value
    if (searchKey) {
      this.setData({
        isShow: true
      })
    } else {
      this.setData({
        isShow: false
      })
    }
  },

  //点击关闭按钮返回搜索页面
  back: function(event) {
    wx.navigateBack({
      url: "../search/search"
    })
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
    let pageNo = this.data.pageNo + 1
    this.setData({
      pageNo: pageNo
    })
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/blog/search',
      data: {
        key: this.data.searchInput,
        pageSize: 20,
        pageNo: this.data.pageNo,
        tag: this.data.tag
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