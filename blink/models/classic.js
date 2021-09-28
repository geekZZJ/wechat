import {
  HTTP
} from "../utils/http"

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: '/recommend/desc',
      success: (res) => {
        sCallback(res)
      }
    })
  }
}

export {
  ClassicModel
}