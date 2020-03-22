import { Config } from './config.js';
import { Token } from './token.js';

let token = new Token()

export class Base {
  constructor() {
    this.BaseRequestUrl = Config.restUrl;
  }

  request(params) {
    var url = this.BaseRequestUrl + params.url;
    if (!params.method) {
      params.method = 'GET';
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.method,
      header: {
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success: function(res) {
        params.sCallBack&&params.sCallBack(res.data);
      },
      fail: function(err) {
        console.log(err);
      }

    })
  }




}