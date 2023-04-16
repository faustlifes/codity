import {SingletonTemplate} from '../common/singleton.template';

let instance;

class Leetcode2 extends SingletonTemplate {
  static getInstance() {
    return super.getInstance(instance, Leetcode2);
  }
}

export default Leetcode2.getInstance();