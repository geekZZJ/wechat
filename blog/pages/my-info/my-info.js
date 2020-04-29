// pages/my-info/my-info.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderArr: ['女', '男'],
    index: 0,
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
        console.log(res.data)
        if (res.data.code === '0000') {
          let curDate
          let email = res.data.data.email
          let sign = res.data.data.sign
          let position = res.data.data.position
          let region
          if (position === null) {
            region = that.data.region
          } else {
            region = position.split(",")
          }

          //获取今天日期
          if (res.data.data.birthday === null) {
            let date = new Date()
            let year = date.getFullYear()
            let month = (date.getMonth() + 1).toString().padStart(2, "0")
            let day = (date.getDate()).toString().padStart(2, "0")
            curDate = `${year}-${month}-${day}`
          } else {
            curDate = res.data.data.birthday
          }
          if (email === null) {
            email = ''
          }
          if (sign === null) {
            sign = '无'
          }
          that.setData({
            birthday: curDate,
            email: email,
            sign: sign,
            nickName: res.data.data.nickName,
            region: region,
            index: res.data.data.gender
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

  //跳转修改用户签名
  sign: function() {
    wx.navigateTo({
      url: '../textarea/textarea?sign=' + this.data.sign
    })
  },

  //更新用户信息
  updateInfo: function(event) {
    let gender = this.data.index
    let birthday = this.data.birthday
    let region = this.data.region
    let email = this.data.email
    let sign = this.data.sign
    let that = this
    region = `${region[0]},${region[1]},${region[2]}`
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if (reg.test(email)) {} else {
      return
    }
    wx.request({
      url: app.globalData.host + '/xhblog/user/update',
      method: "PUT",
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
      success(res) {
        console.log(res.data)
        if (res.data.code === '0000') {
          var pages = getCurrentPages()
          var prevPage = pages[pages.length - 2]
          let gender = 'user.gender'
          let sign = 'user.sign'
          prevPage.setData({
            [gender]: that.data.index,
            [sign]: that.data.sign
          })
          wx.navigateBack({
            url: '../my/my'
          })
          return
        }
        if (res.data.code === '0110') {
          wx.showToast({
            title: '邮箱格式错误',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
          return
        }
        if (res.data.code === '8000') {
          wx.showToast({
            title: '邮件已发至你的邮箱，激活即可体验更多功能',
            duration: 2000,
            icon: "none"
          })
          setTimeout(() => {
            wx.navigateBack({
              url: '../my/my'
            })
          }, 2000)
          return
        } else {
          wx.showToast({
            title: '用户信息修改失败',
            duration: 1000,
            image: '/images/icon/xxx.png'
          })
        }
      }
    })
  }
})