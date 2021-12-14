// pages/index/index.js
import * as echarts from '../../components/ec-canvas/echarts';
import geoJson from './china.js';

let pageInstance = {}

function randomData() {
  return Math.round(Math.random() * 1000);
}

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);
  echarts.registerMap('china', geoJson);
  const option = {
    tooltip: {
      triggerOn: "click",
      formatter: function (e) {
        pageInstance.BindEvent(e);
        return e.name + ':' + e.value
      },
      backgroundColor: '#fff',
      borderColor: "#000",
      padding: 5,
      textStyle: {
        color: '#000'
      },
      position: function (point, params, dom, rect, size) {
        let x = point[0],
          y = point[1],
          viewWidth = size.viewSize[0],
          viewHeight = size.viewSize[1],
          boxWidth = size.contentSize[0],
          boxHeight = size.contentSize[1],
          posX = 0,
          posY = 0
        if (x + boxWidth > viewWidth) {
          posX = x - boxWidth;
        } else {
          posX = x;
        }
        if (y + boxHeight > viewHeight) {
          posY = y - boxHeight
        } else {
          posY = y
        }
        return [posX, posY];
      },
    },
    animation: false,
    geo: {
      map: "china",
      select: {
        // 切换后残留上次地块颜色
        itemStyle: {
          color: 'red'
        }
      },
      emphasis: {
        itemStyle: {
          areaColor: 'red'
        }
      },
      roam: false,
      zoom: 1.2,
      top: 30,
      label: {
        show: true,
        fontSize: 10,
        color: "rgba(0, 0, 0, 0.7)"
      },
      regions: [{
        name: '新疆',
        itemStyle: {
          areaColor: '#2a5bc1'
        },
        label: {
          color: '#ffffff',
          show: true
        }
      }],
      itemStyle: {
        borderColor: "rgba(0, 0, 0, 0.2)"
      }
    },
    series: [{
      type: "map",
      geoIndex: 0,
      data: [{
          name: '北京',
          value: randomData()
        },
        {
          name: '天津',
          value: randomData()
        },
        {
          name: '上海',
          value: randomData()
        },
        {
          name: '重庆',
          value: randomData()
        },
        {
          name: '河北',
          value: randomData()
        },
        {
          name: '河南',
          value: randomData()
        },
        {
          name: '云南',
          value: randomData()
        },
        {
          name: '辽宁',
          value: randomData()
        },
        {
          name: '黑龙江',
          value: randomData()
        },
        {
          name: '湖南',
          value: randomData()
        },
        {
          name: '安徽',
          value: randomData()
        },
        {
          name: '山东',
          value: randomData()
        },
        {
          name: '新疆',
          value: randomData()
        },
        {
          name: '江苏',
          value: randomData()
        },
        {
          name: '浙江',
          value: randomData()
        },
        {
          name: '江西',
          value: randomData()
        },
        {
          name: '湖北',
          value: randomData()
        },
        {
          name: '广西',
          value: randomData()
        },
        {
          name: '甘肃',
          value: randomData()
        },
        {
          name: '山西',
          value: randomData()
        },
        {
          name: '内蒙古',
          value: randomData()
        },
        {
          name: '陕西',
          value: randomData()
        },
        {
          name: '吉林',
          value: randomData()
        },
        {
          name: '福建',
          value: randomData()
        },
        {
          name: '贵州',
          value: randomData()
        },
        {
          name: '广东',
          value: randomData()
        },
        {
          name: '青海',
          value: randomData()
        },
        {
          name: '西藏',
          value: randomData()
        },
        {
          name: '四川',
          value: randomData()
        },
        {
          name: '宁夏',
          value: randomData()
        },
        {
          name: '海南',
          value: randomData()
        },
        {
          name: '台湾',
          value: randomData()
        },
        {
          name: '香港',
          value: randomData()
        },
        {
          name: '澳门',
          value: randomData()
        },
        {
          name: '南海诸岛',
          value: randomData()
        },
      ],
    }] //对应点击事件响应
  };

  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageInstance = this;
    this.setData({
      ec: {
        onInit: initChart,
      }
    })
  },
  // 点击区域事件
  BindEvent(e) {
    console.log(444, e.name, e.value)
    this.data.aa = true
  },

  handleBox() {
    this.data.aa = false
    this.setData({}, () => {
      if(!this.data.aa){
        // this.setData({
        //   ec: null
        // })
      }
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