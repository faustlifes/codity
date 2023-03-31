import { SingletonTemplate } from '../common/singleton.template';

let instance;

class Lesson4 extends SingletonTemplate {
  static getInstance () {
    return super.getInstance(instance, Lesson4);
  }
  /*FrogRiverOne Lesson4.1
  Find the earliest time when a frog can jump to the other side of a river.*/
  solution1 (X = 5, A = [1,3,1,4,2,3,5,4]) {
    /*A = [1,3,1,4,1,3,5,4,4,3,1,5,5,5,5,5,5,2,4,3,1,2,3,5];
    * X= 5*/
    const inputA = A;
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
  solution2 (A = [5,5,5,5,5]) {
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
  solution3 (A = [7,-1,2,1]) {
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
  solution4 (N = 5, A = [1,4,4,6,1,4,4]) {
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

export default Lesson4.getInstance();
