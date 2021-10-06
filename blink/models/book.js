import {
  HTTP
} from "../utils/http-p"

class BookModel extends HTTP{
  getHotList(){
    return this.request({
      url:'/recommend/desc'
    })
  }
}

export {
  BookModel
}