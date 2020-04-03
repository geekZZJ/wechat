// pages/hot/hot.js
let nav = require('../../data/nav-data')
let app = getApp()
let isInitSelfShow = true

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      navClass: nav.techList,
      blogs: nav.blogList,
      pageNo: 1
    })

    //获取顶部高度
    try {
      const res = wx.getSystemInfoSync()
      this.setData({
        view: {
          headerPT: res.statusBarHeight + 32,
          navMT: res.statusBarHeight + 92,
          posHeight: res.statusBarHeight + 231,
          navClass: this.data.navClass,
          blogs: this.data.blogs
        }
      })
    } catch (e) {
      console.log(e)
    }

    //初始获取数据
    this.onSwiperInit()
    this.init()
  },

  //实现页面跳转
  onBlogTap: function(event) {
    let blogId = event.currentTarget.dataset.blogid
    //添加浏览记录
    wx.request({
      url: app.globalData.host + '/xhblog/browse/save',
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
          wx.navigateTo({
            url: "../blog-detail/blog-detail?id=" + blogId
          })
        } else {
          wx.showToast({
            title: '浏览记录添加失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
    })
  },

  //获取轮播图数据
  onSwiperInit: function(event) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/blog/hot',
      method: "GET",
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          that.setData({
            imgList: res.data.data
          })
        } else {
          wx.showToast({
            title: '轮播图获取失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
    })
  },

  //轮播图跳转
  onSwiperTap: function(event) {
    let hotId = event.target.dataset.hotid
    wx.navigateTo({
      url: "../blog-detail/blog-detail?id=" + hotId
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

  //点击跳到搜索页面
  search: function(event) {
    wx.navigateTo({
      url: "../search/search"
    })
  },

  //初始获取数据
  init: function() {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/blog/list',
      data: {
        'typeId': 0,
        'platId': 1006,
        'pageSize': 20
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        console.log(res.data)
        if (res.data.code === '0000') {
          that.setData({
            contents: res.data.data.data
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

  // 根据技术分类更新页面
  onNavClass: function(event) {
    let that = this
    let techId = event.currentTarget.dataset.techid
    let navClass = this.data.navClass
    let tempId = 0
    for (let i = 0; i < navClass.length; i++) {
      let str = 'navClass[' + i + '].checked'
      if (navClass[i].technologyId === techId) {
        tempId = i
      }
      this.setData({
        [str]: false
      })
    }
    let temp = 'navClass[' + tempId + '].checked'
    this.setData({
      [temp]: true,
      techCheckId: techId
    })
    this.onLoad()
    //发送请求
    wx.request({
      url: app.globalData.host + '/xhblog/blog/list',
      data: {
        'typeId': techId ? techId : 0,
        'platId': this.data.blogCheckId ? this.data.blogCheckId : 0,
        'pageSize': 20
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          that.setData({
            contents: res.data.data.data
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

  // 根据博客平台更新页面
  onNavBlog: function(event) {
    let that = this
    let blogId = event.currentTarget.dataset.blogid
    let blogs = this.data.blogs
    let tempId = 0
    for (let i = 0; i < blogs.length; i++) {
      let str = 'blogs[' + i + '].checked'
      if (blogs[i].blogId === blogId) {
        tempId = i
      }
      this.setData({
        [str]: false
      })
    }
    let temp = 'blogs[' + tempId + '].checked'
    this.setData({
      [temp]: true,
      blogCheckId: blogId
    })
    this.onLoad()
    //发送请求
    wx.request({
      url: app.globalData.host + '/xhblog/blog/list',
      data: {
        'platId': blogId ? blogId : 0,
        'typeId': this.data.techCheckId ? this.data.techCheckId : 0,
        'pageSize': 20
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          that.setData({
            contents: res.data.data.data
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

  //封装刷新数据
  onRefreshData: function(event) {
    let pageNo = Math.floor(Math.random() * 10 + 1)
    let that = this
    let techId = this.data.techCheckId ? this.data.techCheckId : 0
    let blogCheckId = this.data.blogCheckId ? this.data.blogCheckId : 1006
    this.setData({
      pageNo: pageNo
    })

    wx.request({
      url: app.globalData.host + '/xhblog/blog/list',
      data: {
        'typeId': techId,
        'platId': blogCheckId,
        'pageSize': 20,
        'pageNo': this.data.pageNo
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          that.setData({
            contents: res.data.data.data
          })
          wx.stopPullDownRefresh()
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

  //点击tabbar刷新数据
  onTabItemTap(item) {
    this.onRefreshData()
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 400
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

  onHide: function() {
    isInitSelfShow = false
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onRefreshData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pageNo = this.data.pageNo + 1
    let that = this
    let techId = this.data.techCheckId ? this.data.techCheckId : 0
    let blogCheckId = this.data.blogCheckId ? this.data.blogCheckId : 1006
    this.setData({
      pageNo: pageNo
    })

    //发送请求
    wx.request({
      url: app.globalData.host + '/xhblog/blog/list',
      data: {
        'typeId': techId,
        'platId': blogCheckId,
        'pageSize': 20,
        'pageNo': this.data.pageNo
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code === '0000') {
          let arr1 = that.data.contents
          let arr2 = res.data.data.data
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