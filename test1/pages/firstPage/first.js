// pages/firstPage/first.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"这里是内容",
    btnText:"这是按钮的内容",
    show:true,
    news: ['aaa', 'bbb', 'ccc','ddd']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  btnClick:function(){
    console.log("按钮被点击")
    var isShow = this.data.show
    console.log("isShow:"+isShow)

    var newsdata = this.data.news
    newsdata.shift()

    this.setData({text:"这是一个新的内容...",show:!isShow,news:newsdata})
  }
})