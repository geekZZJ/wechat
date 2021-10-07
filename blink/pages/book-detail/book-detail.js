// pages/book-detail/book-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {
      image: "https://qpic.y.qq.com/music_cover/xiabfMZAmQ0PYUzgCvOicArIoGLzqL3n6q3fDiawWkhTTVWgGNM52HBNA/300?n=1",
      title: "流行节奏控",
      author: "欧美"
    },
    comments: [{
        content: "测试",
        num: 1
      },
      {
        content: "测试2",
        num: 2
      },
      {
        content: "测试3",
        num: 3
      },
      {
        content: "测试测试测试测试",
        num: 4
      },
      {
        content: "测试测试测试测试456",
        num: 5
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid
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