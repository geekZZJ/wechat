// pages/my-info/my-info.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderArr: ['女', '男'],
    index: 1,
    birthday: '2020-01-01',
    customItem: '全部',
    region: ['广东省', '广州市', '海珠区'],
    sign: '',
    email: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getInfo()
  },

  //获取用户信息
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
          console.log(res.data.data)
          let curDate
          let email = res.data.data.email
          let sign = res.data.data.sign

          //获取今天日期
          if (res.data.data.birthday === null) {
            let date = new Date()
            let year = date.getFullYear()
            let month = (date.getMonth() + 1).toString().padStart(2, "0")
            let day = (date.getDate()).toString().padStart(2, "0")
            curDate = `${year}-${month}-${day}`
          }
          if (email === null) {
            email = ''
          }
          if (sign === undefined) {
            sign = ''
          }
          that.setData({
            index: res.data.data.gender,
            birthday: curDate,
            email: email,
            sign: sign,
            nickName: res.data.data.nickName
          })
        } else {
          wx.showToast({
            title: '用户信息获取失败',
            duration: 1000,
            icon: "none"
          })
        }
      }
    })
  },

  genderPicker: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  addEmail: function(e) {
    this.setData({
      email: e.detail.value
    })
  },
  sign: function() {
    wx.navigateTo({
      url: '../textarea/textarea'
    })
  },

  updateInfo: function(event) {
    let gender = this.data.index
    let birthday = this.data.birthday
    let region = this.data.region
    let email = this.data.email
    let sign = this.data.sign
    let that = this
    wx.request({
      url: app.globalData.host + '/xhblog/user/update',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      data: {
        "gender": gender,
        "nickName": this.data.nickName,
        "birthday": birthday,
        "position": region,
        "email": email,
        "sign": sign
      },
      method: "PUT",
      success(res) {
        console.log(res.data)
        if (res.data.code === '0000') {
          wx.navigateBack({
            url: '../my/my'
          })
        } else {
          wx.showToast({
            title: '用户信息修改失败',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  }
})