// pages/welcome/welcome.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /*wx.openSetting({
    success(res) {
      console.log(res.authSetting)
      res.authSetting = {
        "scope.userInfo": true,
        "scope.userLocation": true
      }
    }
  })*/


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onTap()
  },

  //获取openID
  onTap: function() {
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
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  getUserInfo(e) {
    console.log(e.detail)
    let userInfo = e.detail.userInfo
    let that = this
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
            'openId': 1
        },
        header: {
            'content-type': 'application/json'
        },
        success(res) {
          console.log(res.data)
            /*if (res.data.code === '0000') {
                that.setData({
                    contents: res.data.data.data
                })
            } else {
                wx.showToast({
                    title: '请求失败',
                    duration: 1000,
                    image: '/images/icon/xxx.png'
                })
            }*/
        }
    })
  },

  /*wx.redirectTo({
    url: "../choose/choose"
  })*/

  //获取用户信息
  getSetting: function() {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log(123)
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.getUserInfo()
            },
            fail() {
              console.log(456)
            },
            complete() {
              console.log(789)
            }
          })
        }
      }
    })
    /*wx.getUserInfo({
        success: function(res) {
          console.log(res)
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country
        }
    })*/
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