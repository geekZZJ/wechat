// pages/form1/form1.js

var wxCharts = require('../../utils/wxcharts.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bill1: function () {
    wx.navigateTo({
      url: '../form/form',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    new wxCharts({
      animation: true,
      canvasId: 'form',
      type: 'ring',
      extra: {
        ringWidth: 10,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: '总支出',
        color: '#333',
        fontSize: 9
      },
      subtitle: {
        name: '828.00',
        color: '#333333',
        fontSize: 16
      },
      series: [{
        name: '饮食',
        data: 462,
        stroke: false
      }, {
        name: '购物',
        data: 97,
        stroke: false
      }, {
        name: '出行',
        data: 46,
        stroke: false
      }, {
        name: '娱乐',
        data: 223,
        stroke: false
      }],
      disablePieStroke: true,
      width: 360,
      height: 260,
      dataLabel: true,
      legend: false,
      padding: 0
    })
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