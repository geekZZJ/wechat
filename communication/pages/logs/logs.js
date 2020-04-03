//logs.js

Page({
  data: {},
  onLoad: function() {
    this.doSomething()
  },
  doSomething() {
    wx.setStorageSync('test', 'hello from PageC');
  }
})