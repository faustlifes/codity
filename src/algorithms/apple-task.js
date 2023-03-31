import { SingletonTemplate } from '../common/singleton.template';

let instance = null


class AppleTask extends SingletonTemplate {
  static getInstance() {
    return super.getInstance(instance, AppleTask);
  }
  /*Gia has 2(2 number from inputData)
       more apples than Madalina together
        they have 10 apples(1 number from inputData)*/
  solution1(inputData = '11\n3') {
    const [arr, count, diff, rest] = [
      inputData.split('\n'),
      Number(arr[0]),
      Number(arr[1]),
      (count - diff) % 2
    ];
    let needed = 0;
    if (rest) {
      needed = 1;
    }
    const middle = (count + needed - diff)/2;
    return `${middle + diff}\n${middle}`;
  }
}

export default AppleTask.getInstance();
