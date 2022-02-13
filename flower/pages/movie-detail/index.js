// pages/movie-detail/index.js
import {convertToString,convertToInfos} from "../../utils/util"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mid = options.mid
    this.getData(mid)
  },

  getData(id) {
    wx.request({
      url: `${app.globalData.baseUrl}subject/${id}`,
      success: (res) => {
        this.dealData(res.data)
      }
    })
  },

  dealData(movie){
    const data = {}
    data.castsInfo = convertToInfos(movie.casts)
    data.directors =  convertToString(movie.directors)
    data.casts = convertToString(movie.casts)
    data.genres = movie.genres.join("、")
    this.setData({
      movie:{
        ...movie,
        ...data
      }
    })
  },

  onViewPost(){
    wx.previewImage({
      urls: [this.data.movie.images.large],
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