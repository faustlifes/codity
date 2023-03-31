import { SingletonTemplate } from '../common/singleton.template';

let instance;

class Lesson6 extends SingletonTemplate {
  static getInstance () {
    return super.getInstance(instance, Lesson6);
  }

  /* LESSON 6.1 Distinct count of distinct items*/
  solution1 (A = [4,2,2,5,1,5,8]) {
    let result = 1;
    const length = A.length;
    if (A.length === 0) {
      return 0;
    }
    let i = 1;
    let arr = A.sort();
    let prev = arr[ 0 ];

    for (i; i < length; i++) {
      if (arr[ i ] !== prev) {
        result += 1;
        prev = arr[ i ];
      }
    }
    return result;
  }

  /* LESSON 6.2  MaxProductOfThree */
  solution2 (A = [-3,1,2,-2,5,6]) {

    const length = A.length;

    A.sort((a, b) => a - b);

    const p1 = A[ 0 ] * A[ 1 ] * A[ 2 ];
    const p2 = A[ length - 3 ] * A[ length - 2 ] * A[ length - 1 ];
    const p3 = A[ 0 ] * A[ 1 ] * A[ length - 1 ];
    const p4 = A[ 0 ] * A[ length - 2 ] * A[ length - 1 ];

    const max1 = Math.max(p1, p2);
    const max2 = Math.max(p3, p4);

    return Math.max(max1, max2);

  }

  /*LESSON 6.3  Triangle */
  solution3 (A = [10, 2, 5, 1, 8, 20]) {
    A.sort((a, b) => a - b);
    const length = A.length;
    let i;
    let result = 0;
    for (i = length - 1; i >= 0; i--) {
      const res1 = A[i] + A[i - 1] > A[i - 2];
      const res2 = A[i - 1] + A[i - 2] > A[i];
      const res3 = A[i] + A[i - 2] > A[i - 1];
      if (res1 && res2 && res3) {
        result = 1;
        break;
      }
    }
    return result;
  }

  /*LESSON 6.4 NumberOfDiscIntersections */
  solution4 (A = [10, 2, 5, 1, 8, 20]) {

  }
}

export default Lesson6.getInstance();
