// pages/index/index.js
import {
  ClassicModel
} from "../../models/classic"
import {
  LikeModel
} from "../../models/like"
const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: [],
    like: true,
    count: 99,
    latest: true,
    first: false,
    curIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res => {
      this.setData({
        classicData: res.data
      })
    })
  },

  onLike: function (event) {
    let behavior = event.detail.behavior
    // likeModel.like(behavior, this.data.classicData[0]._id, this.data.classicData[0].type)
  },

  onNext: function (event) {
    const index = this.data.curIndex - 1
    let latest = this.data.latest
    let first = this.data.first
    if (index === 0) {
      latest = true
    }
    if (index !== this.data.classicData.length - 1) {
      first = false
    }
    this.setData({
      curIndex: index,
      latest,
      first
    })
  },

  onPrevious: function (event) {
    const index = this.data.curIndex + 1
    let first = this.data.first
    let latest = this.data.latest
    if (index === this.data.classicData.length - 1) {
      first = true
    }
    if (index !== 0) {
      latest = false
    }
    this.setData({
      curIndex: index,
      first,
      latest
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})