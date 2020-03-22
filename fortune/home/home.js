// home/home.js
import { Home } from 'home-model.js';
var home = new Home();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color1:"#538afe",
    color2:"#999999",
    color3:"#999999",
    font1:"36rpx",
    font2:"28rpx",
    font3: "28rpx",
    bb:"block",
    bb1:"none",
    bb2:"none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = 1;
    home.getActivityRecent(id,(res)=>{
      // console.log(res);
    })
  },
  spendfee:function(){
    var color2 = "#538afe";
    var font2 = '36rpx';
    var color1 = "#999";
    var font1 = "28rpx";
    var font3 = "28rpx";
    var color3 = "#999";
    var bb = "block";
    var bb1 = "none";
    var bb2 = "none";
    this.setData({
      color2:color2,
      font2:font2,
      color1:color1,
      font1:font1,
      color3:color3,
      font3:font3,
      bb1:bb,
      bb:bb1,
      bb2:bb2
    });
  },
  allfee: function () {
    var color2 = "#538afe";
    var font2 = '36rpx';
    var color1 = "#999";
    var font1 = "28rpx";
    var font3 = "28rpx";
    var color3 = "#999";
    var bb = "block";
    var bb1 = "none";
    var bb2 = "none";
    this.setData({
      color1: color2,
      font1: font2,
      color2: color1,
      font2: font1,
      color3: color3,
      font3: font3,
      bb:bb,
      bb1:bb1,
      bb2:bb2
    });
  },
  receivedfee: function () {
    var color2 = "#538afe";
    var font2 = '36rpx';
    var color1 = "#999";
    var font1 = "28rpx";
    var font3 = "28rpx";
    var color3 = "#999";
    var bb = "block";
    var bb1 = "none";
    var bb2 = "none";
    this.setData({
      color3: color2,
      font3: font2,
      color2: color1,
      font2: font1,
      color1: color3,
      font1: font3,
      bb2:bb,
      bb:bb1,
      bb1:bb1
    });
  },
  bill: function () {
    wx.navigateTo({
      url: '../pages/bill/bill',
    })
  },
  budget:function(){
    wx.navigateTo({
      url: '../pages/budget/budget',
    })
  },
  form:function(){
    wx.navigateTo({
      url: '../pages/form/form',
    })
  },
  detail:function(){
    wx.navigateTo({
      url: '../pages/detail/detail',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})