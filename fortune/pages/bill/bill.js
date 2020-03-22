// pages/bill/bill.js
import { Bill } from 'bill-model.js';
var bill = new Bill();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl:'https://x2018062501.aweyu.cn/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bill.getActivityRecent(res=>{
      console.log(res.data[1][0]);
      this.setData({
        category: res.data[1]
      });
    });
  },
  add:function(){
    wx.navigateTo({
      url: '../add/add',
    })
  },
  bill1:function(){
    wx.navigateTo({
      url: '../bill1/bill1',
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