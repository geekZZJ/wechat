import { Base } from '../../utils/base.js';

class Bill extends Base {
  constructor() {
    super();
  }

  getActivityRecent(callBack) {
    var params = {
      url: 'category/all',
      method: 'GET',
      sCallBack: function (res) {
        callBack && callBack(res)
      }
    }
    this.request(params);
  }
}

export { Bill };