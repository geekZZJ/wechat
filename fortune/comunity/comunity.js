// comunity/comunity.js
Page({


  data: {
    imgUrls: [
      "../images/basketball.jpg",
      "../images/learn.jpg",
      "../images/happy.jpg"
    ],
    indicatorDots: false,
    interval: 3000,
    duration: 1000
  },


  onLoad: function (options) {
  
  },
  message:function(){
    wx.navigateTo({
      url: '../pages/message/message',
    })
  },
  express:function(){
    wx.navigateTo({
      url: '../pages/express/express',
    })
  },
  comments:function(){
    wx.navigateTo({
      url: '../pages/comments/comments',
    })
  },

  onShow: function () {
  
  },

 
})