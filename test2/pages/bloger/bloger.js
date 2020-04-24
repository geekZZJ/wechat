// pages/bloger/bloger.js
const app = getApp()

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
    let blogerId = options.id
    this.getInfo(blogerId)
  },

  //获取博主信息
  getInfo: function(id) {
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/bloger/' + id,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        console.log(res.data)
        if (res.data.code === '0000') {
          that.setData({
            blogerInfo: res.data.data
          })
            that.getPlat(that.data.blogerInfo.platId)
        } else {
          wx.showToast({
            title: '博主信息获取失败',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
        }
      }
    })
  },

    //获取博客平台信息
    getPlat: function(id) {
        let that = this
        wx.request({
            url: app.globalData.host + '/xhblog/blogplat/' + id,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success(res) {
                console.log(res.data)
                if (res.data.code === '0000') {
                    that.setData({
                        platName: res.data.data.name
                    })
                } else {
                    wx.showToast({
                        title: '博客平台信息获取失败',
                        duration: 1000,
                        image: '/images/icon/xxx.png'
                    })
                }
            }
        })
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