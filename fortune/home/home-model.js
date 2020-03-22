import { Base } from '../utils/base.js';

class Home extends Base {
  constructor() {
    super();
  }

  getActivityRecent(id,callBack) {
    var params = {
      url: 'bill/get',
      method:'GET',
      data:{id},
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export { Home };