// pages/hot/hot.js
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
    let contents = [
        {
            title:"python合并多个txt文件",
            abstract:"合并一个文件夹下的多个txt文件需要注意一下几点:注意必须将文件放在同一目",
            heat:"1049万"
        },
        {
            title:"如何看待苹果中国宣布2019款iPad降价，最高降幅达500元？",
            abstract:"1月1日，苹果对官网在线商城的iPad 2019版的售价进行了调整，32GB 版售价",
            heat:"1023万"
        },
        {
            title:"如何看待日产汽车前CEO卡洛斯·戈恩藏身乐器盒中逃离日本一事？",
            abstract:"此前被日本警方逮捕的全球车坛传奇人物，日产汽车前 CEO 卡洛斯·戈恩（Carl",
            heat:"799万"
        },
        {
            title:"老婆怀孕，作为老公的你是怎么撑过来的？",
            abstract:"老婆怀孕整整 3 个月了，前期孕吐非常严重，吃什么吐什么。过了三个月的几",
            heat:"100万"
        },
        {
            title:"如何评价综艺节目《歌手》2020的首发阵容？",
            abstract:"毛不易、周深、徐佳莹、萧敬腾、刘柏辛、袁娅维、 Misia",
            heat:"1049万"
        }
    ]
    this.setData({
        contents:contents
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