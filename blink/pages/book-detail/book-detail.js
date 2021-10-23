// pages/book-detail/book-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {
      image: "https://qpic.y.qq.com/music_cover/xiabfMZAmQ0PYUzgCvOicArIoGLzqL3n6q3fDiawWkhTTVWgGNM52HBNA/300?n=1",
      title: "流行节奏控",
      author: "欧美",
      summary: "20 世纪 90 年代的柏林，一位艺术家和一名黑客发明了看世界的新方式。多年后，二人重聚，起诉谷歌侵犯专利权。\\n20 世纪 90 年代的柏林，一位艺术家和一名黑客发明了看世界的新方式。多年后，二人重聚，起诉谷歌侵犯专利权。\\n20 世纪 90 年代的柏林，一位艺术家和一名黑客发明了看世界的新方式。多年后，二人重聚，起诉谷歌侵犯专利权。\n20 世纪 90 年代的柏林，一位艺术家和一名黑客发明了看世界的新方式。多年后，二人重聚，起诉谷歌侵犯专利权。",
      publisher: "人民邮电出版社",
      pubdate: "2021-4",
      pages: "264",
      price: "49.00元",
      binding: "平装"
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
    ],
    likeCount: 0,
    likeStatus: false,
    posting: false
  },

  onFakePost(event) {
    this.setData({
      posting: true
    })
  },

  onCancel(event){
    this.setData({
      posting: false
    })
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