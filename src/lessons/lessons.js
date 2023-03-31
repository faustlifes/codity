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

class Lessons extends SingletonTemplate {
  static getInstance() {
    return super.getInstance(instance, Lessons);
  }

  /*Find binary gap Lesson1*/
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

  /*OddOccurrencesInArray lesson2.1*/
  solution21 (A =
               [ 12, 1000, 50, 12, 50, 454, 12, 1024, 34543, 1000, 3, 12, 3, 454, 0, 0, 100000, 34543, 11111, 11111, 100000 ]
  ) {
    let result;
    let i;
    const len = A.length;

    for (i = 0; i < len; i++) {
      result ^= A[i];
    }
    return result;
  }

  /* CyclicRotation lesson2.2*/
  solution22 (A = [42,34], K = 1) {
    let result = A;
    let i = 0;

    if (K % A.length === 0) {
      return result;
    }
    for (i = 0; i < K; i ++) {
      result = result.map((item, index) => {
        if (index === 0) {
          return result[ result.length - 1 ];
        }
        return result[ index - 1 ];
      });
    }
    return result;
  }

  /*FrogJmp Lesson3.1*/
  solution31 (X = 10, Y = 10000000000, D = 3000) {
    return Math.ceil((Y - X) / D);
  }
  /*PermMissingElem Lesson3.2*/
  solution32 (A = [2]) {
    let result;
    let incomeArray = A;
    let i;
    if (A.length === 0) {
      result = 1;
    } else {
      incomeArray = incomeArray.sort((a, b) => a - b);
      for (i = 0; i < incomeArray.length; i++) {
        if ((incomeArray[i] - 1 === 1 && !incomeArray[i - 1]) ||
          (incomeArray[i - 1] && incomeArray[i] - 1 !== incomeArray[i - 1])) {
          result = incomeArray[i] - 1;
          break;
        } else {
          result = incomeArray[i] + 1;
        }
      }
    }
    return result;
  }
  /* TapeEquilibrium Lesson3.3
     Minimize the value |(A[0] + ... + A[P-1]) - (A[P] + ... + A[N-1])|.*/
  solution33 (A = [3,4]) {
    // A = [4, 6, 1, 3, 2,7,5,8,9,12,10,20,18,15,14,11,19,13,17];
    // A = [3,1,2,4,3];
    let result;
    let p;
    const incomeArray = [...A];
    const length = incomeArray.length;
    let rightSum = 0;
    let leftSum;
    for (p = 1; p < length; p++) {
      rightSum += incomeArray[p];
    }

    leftSum = incomeArray[0];
    result = Math.abs(leftSum - rightSum);

    for (p = 2; p < length; p++) {
      leftSum += incomeArray[p - 1];
      rightSum -= incomeArray[p - 1];

      const diff = Math.abs(leftSum - rightSum);
      if ((result === undefined) || (diff < result)) {
        result = diff;
      }

    }
    return result;
  }

  /*FrogRiverOne Lesson4.1
Find the earliest time when a frog can jump to the other side of a river.*/
  solution41 (X = 5, A = [1,3,1,4,2,3,5,4]) {
    /*A = [1,3,1,4,1,3,5,4,4,3,1,5,5,5,5,5,5,2,4,3,1,2,3,5];
    * X= 5*/
    const inputA = [...A];
    const length = inputA.length;
    let steps = X;
    const leaves = [];
    let result = -1;
    let k;
    for (k = 0; k < length; k++) {
      if (!leaves[ inputA[ k ] ]) {
        leaves[ inputA[ k ] ] = true;
        steps--;
      }
      if (steps === 0) {
        result = k;
        break;
      }
    }
    return result;
  }

  /* PermCheck Lesson4.2
Check whether array A is a permutation. */
  solution42 (A = [5,5,5,5,5]) {
    // arr = [1,3,2,5,4];
    //arr = [1,3,1,4,1,3,5,4,4,3,1,5,5,5,5,5,5,2,4,3,1,2,3,5];
    const incomeArray = [...A];
    const bitmap = {};
    const length = incomeArray.length;
    let i;
    let maxValue = Math.max(...incomeArray);
    if (length > maxValue) {
      return 0
    }
    for (i = 0; i < length; i++) {
      bitmap[incomeArray[i]] = true;
    }
    return Object.keys(bitmap).length === maxValue ? 1 : 0;
  }
  /* MissingInteger Lesson 4.3
Find the smallest positive integer that does not occur in a given sequence.*/
  solution43 (A = [7,-1,2,1]) {
    // A = [1,3,2,5,4];
    // A = [1,3,1,4,1,3,5,4,4,3,1,5,5,5,5,5,5,2,4,3,1,2,3,5];
    let result;
    let i;
    const incomeArray = [...A].sort((a, b) => a - b).filter(a => a > 0);
    const length = incomeArray.length;
    let prevItem = - 1;
    if (incomeArray[0] !== 1) {
      result = 1;
    }
    for (i = 1; i < length; i++) {
      if (incomeArray[i] - incomeArray[i - 1] > 1) {
        result = incomeArray[i - 1] + 1;
        break;
      }
      prevItem = incomeArray[i];

    }
    if (result < 0) {
      result = 1;
    }
    if (!result) {
      result = incomeArray[length -  1] + 1;
    }
    return result;
  }
  /* MaxCounters Lesson 4.4
  Calculate the values of counters after applying all
  alternating operations: increase counter by 1; set
  value of all counters to current maximum.*/
  solution44 (N = 5, A = [1,4,4,6,1,4,4]) {
    // A = [1,3,2,5,4];
    //A = [1,3,1,4,1,3,5,4,4,3,1,5,5,5,5,5,5,2,4,3,1,2,3,5];
    const length = A.length;
    let counters = Array(N).fill(0);
    let K;

    for (K = 0; K < length; K++) {
      console.log('A[K] = ',A[K]);
      if (A[K] >= 1 && A[K] <= N) {
        console.log('counters before = ', counters);
        counters[A[K] - 1] += 1;
        console.log('counters after = ', counters);
      } else if(A[K] > N) {
        const max = Math.max(...counters);
        console.log('max = ', max);
        counters.fill(max);
        console.log('counters all ', counters);
      }
    }
    return counters;
  }

}

export default Lessons.getInstance();
