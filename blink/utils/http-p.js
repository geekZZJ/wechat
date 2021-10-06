import {
  config
} from "../config"

const tips = {
  1: "抱歉，出现了一个错误",
  1005: "1005错误",
  3000: "3000错误"
}

class HTTP {
  request({url,method='GET',data={}}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,method,data)
    })
  }
  _request(url,resolve,reject,method='GET',data={}) {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json"
      },
      success: (res) => {
        // 获取状态码
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          this._show_error(res.data.code)
        }
      },
      fail: (err) => {
        reject(err)
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: "none",
      duration: 2000
    })
  }
}

export {
  HTTP
}