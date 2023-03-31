import { SingletonTemplate } from '../common/singleton.template';

let instance;

function converToBinary(a) {
  let tmp = a, binary = '';
  while ( tmp > 0 ) {
    binary = ( tmp % 2 ) + binary;
    tmp = Math.floor( tmp / 2 );
  }
  return binary;
}

class Lesson1 extends SingletonTemplate {
  static getInstance() {
     return super.getInstance(instance, Lesson1);
  }

  solution1(N = [1024]) {
    const binaryStr = converToBinary(N).toString();
    let mass = binaryStr.split('1');

    mass = mass.filter((item, index) => !!item && mass[index+1] !== undefined)
    if (mass.length === 1) {
      return mass[0].length;
    } else
    if (mass.length > 0) {
      return mass.reduce((accum, next) => {
        if (typeof accum === 'string') {
          return Math.max(accum.length, next.length);
        } else {
          return Math.max(accum, next.length);
        }
      });
    }
    return 0;
  }

}

export default Lesson1.getInstance();
