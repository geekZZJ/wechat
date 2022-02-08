// pages/posts/index.js
import {
  postList
} from "../../data/post"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [{
        imgSrc: "/images/post/crab.png",
        id: 0
      },
      {
        imgSrc: "/images/post/bl.png",
        id: 1
      },
      {
        imgSrc: "/images/post/sls.jpg",
        id: 2
      },
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true,
    postList: postList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 跳转到详情页
  onJumpToDetail(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `../post-detail/index?pid=${id}`,
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