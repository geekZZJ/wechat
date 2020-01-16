// pages/choose/choose.js
let techData = require('../../data/choose-data')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      contents: techData.techList
    })
  },

  //自定义多选按钮
  onTagTap: function(event) {
    let techid = event.currentTarget.dataset.techid
    let j = 0
    for (let i = 0; i < this.data.contents.length; i++) {
      if (this.data.contents[i].technologyId == techid) {
        if (this.data.contents[i].checked == true) {
          this.data.contents[i].checked = false
        } else {
          this.data.contents[i].checked = true
        }
      }
    }
    for (let i = 0; i < this.data.contents.length; i++) {
      if (this.data.contents[i].checked == true) {
        j++
      }
    }
    if (j > 0) {
      this.data.disabled = false
    } else {
      this.data.disabled = true
    }
    this.setData({
      contents: this.data.contents,
      disabled: this.data.disabled
    })
  },

  //点击发送感兴趣的技术标签
  chooseNext: function(event) {
    let arr = new Array()
    for (let i = 0; i < this.data.contents.length; i++) {
      if (this.data.contents[i].checked == true) {
        arr.push(i)
      }
    }
    //向服务器发送数据未写
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})