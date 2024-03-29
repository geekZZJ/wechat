import {
  config
} from "../config"

const tips = {
  1: "抱歉，出现了一个错误",
  1005: "1005错误",
  3000: "3000错误"
}

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        "content-type": "application/json"
      },
      success: (res) => {
        // 获取状态码
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          this._show_error(res.data.code)
        }
      },
      fail: (err) => {
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