//index.js
var wxCharts = require('../../utils/wxcharts.js');

Page({
  data: {
  },
  onReady:function(e){
    new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: '70%',
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '收益率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '成交量1',
        data: 15,
        stroke: false
      }, {
        name: '成交量2',
        data: 35,
        stroke: false
      }, {
        name: '成交量3',
        data: 78,
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        stroke: false
      }],
      disablePieStroke: true,
      width: 300,
      height: 300,
      dataLabel: false,
      legend: false,
      padding: 0
    })
  },
  onLoad: function () {
  },

})
