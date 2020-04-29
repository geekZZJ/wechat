// pages/welcome/welcome.js
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
    this.onTap()
  },

  //获取openID
  onTap: function() {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.host + '/xhblog/weichat/authentication',
            method: "POST",
            data: {
              jsCode: res.code
            },
            success(res) {
              if (res.data.code === '0000') {
                that.setData({
                  openid: res.data.data.openid
                })
              } else {
                wx.showToast({
                  title: 'openid获取失败',
                  duration: 1000,
                  icon: 'none',
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  //用户注册登录
  getUserInfo(e) {
    let userInfo = e.detail.userInfo
    let that = this
    //查询用户是否注册过
    wx.request({
      url: app.globalData.host + '/xhblog/user/login',
      data: {
        'account': this.data.openid,
        'password': this.data.openid
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.code === '0000') {
          let temp = res.cookies[2].substring(6, 151)
          //已注册
          wx.setStorage({
            key: "token",
            data: temp
          })
          wx.switchTab({
            url: "../hot/hot"
          })
          return
        }
        if (res.data.code === '0205') {
          //用户未注册，自动为其注册
          wx.request({
            url: app.globalData.host + '/xhblog/user/register',
            method: "POST",
            data: {
              'avatarUrl': userInfo.avatarUrl,
              'city': userInfo.city,
              'country': userInfo.country,
              'gender': userInfo.gender,
              'nickName': userInfo.nickName,
              'province': userInfo.province,
              'openId': that.data.openid,
              'password': that.data.openid
            },
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              if (res.data.code === '0000') {
                let temp1 = res.cookies[2].substring(6, 151)
                wx.setStorage({
                  key: "token",
                  data: temp1
                })
                wx.redirectTo({
                  url: "../choose/choose"
                })
              } else {
                wx.showToast({
                  title: '用户注册失败',
                  duration: 1000,
                  image: '/images/icon/xxx.png'
                })
              }
            }
          })
          return
        } else {
          wx.showToast({
            title: '登录失败',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
        }
      }
    })
  }
})