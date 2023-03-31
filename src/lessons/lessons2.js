import { SingletonTemplate } from '../common/singleton.template';

let instance;


class Lessons2 extends SingletonTemplate {
  static getInstance() {
    return super.getInstance(instance, Lessons2);
  }

  /*count range sum from prefix sum A[i,j] = A[j] - A[i - 1]*/
  /* LESSON 5.1 PassingCars */
  solution51 (A = [0,1,0,1,1,0,1,1]) {
    // A = [0,1,0,1,1,0,1,1];
    let pairs = 0;
    let counters = 0;
    const length = A.length;
    for (let k = 0; k < length; k++) {
      if (A[k] === 0) {
        counters++;
      } else {
        pairs += counters;
      }
    }
    return pairs > 1000000000 ? -1 : pairs;
  }

  /* LESSON 5.2 GenomicRangeQuery */
  solution52 (S = 'CAGCCTA', P = [2,5,0], Q = [4,5,6]) {
    //S ='TC';
    const result = [];
    const l = P.length;
    const sl = S.length;
    const impactFactors = {
      A: 1, C: 2, G: 3, T: 4
    }
    const translatedDNAArr = [];
    for (let i = 0; i < sl; i++) {
      translatedDNAArr.push(impactFactors[S[i]]);
    }
    for (let i = 0; i < l; i++) {
      const diffValues = translatedDNAArr.slice(P[i], Q[i] + 1);
      const minVar = Math.min(...diffValues);
      result.push(minVar);
    }
    return result;
  }
  /*LESSON 5.3 CountDiv */
  solution53 (A = 6, B = 11, K = 2) {
    const minVal = Math.floor((A + K - 1) / K) * K;
    if (minVal > B) {
      return 0;
    }

    return Math.floor((B - minVal) / K) + 1;
  }
  /* MinAvgTwoSlice */
  solution54 (A = [4,2,2,5,1,5,8]) {
    let result = 0;
    let P;
    let length = A.length;
    let currAvg;

    let minAvg = (A[0] + A[1]) / 2;

    for (P = 0; P < length - 2; P++) {
      currAvg = (A[P] + A[P + 1]) / 2;
      if (minAvg > currAvg) {
        minAvg = currAvg;
        result = P;
      }
      currAvg = (A[P] + A[P + 1] + A[P + 2]) / 3;
      if (minAvg > currAvg) {
        minAvg = currAvg;
        result = P;
      }
    }
    currAvg = (A[length - 2] + A[length - 1]) / 2
    if (minAvg > currAvg) {
      result = length - 2;
    }
    return result;
  }

  /* LESSON 6.1 Distinct count of distinct items*/
  solution61 (A = [4,2,2,5,1,5,8]) {
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
  solution62 (A = [-3,1,2,-2,5,6]) {

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
  solution63 (A = [10, 2, 5, 1, 8, 20]) {
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

  /* 6.4 NumberOfDiscIntersections */
  solution64 (A = [10, 2, 5, 1, 8, 20]) {

  }

  /* LESSON 7 Brackets*/
  solution71 (S = '{[()()]}') {
    const l = S.length;
    if (l % 2 !== 0) {
      return 0;
    }
    const pairs = {'{': '}', '(': ')', '[': ']'};
    const openBrackets = ['{','[','('];
    const stack = [];

    for (let i = 0; i < l; i++) {
      if (openBrackets.includes(S[i])) {
        stack.push(S[i]);
      } else if (S[i] === pairs[stack[stack.length - 1]]) {
        stack.pop();
      } else {
        return 0;
      }
    }
    if (stack.length === 0) {
      return 1;
    }
    return 0;
  }

  /* LESSON 7.2  Fish */
  solution72 (A = [4, 3, 2, 1, 5], B = [0, 1, 0, 0, 0]) {

    const length = A.length;
    const stack = [];

    let died = 0;
    let i;

    function peekItm () {
      return stack[stack.length - 1];
    }

    for (i = 0; i < length; i++) {
      if (stack.length && (B[i] === 0)) {
        if (peekItm() > A[i]) {
          died++;
        } else {
          while (stack.length && peekItm() < A[i]) {
            stack.pop();
            died++;
          }
          if (stack.length) {
            died++;
          }
        }
      } else if (B[i] === 1) {
        stack.push(A[i]);
      }

    }
    return length - died;
  }

  /*LESSON 7.3 Nesting  */
  solution73 (S = ')()(())') {
    const l = S.length;
    if (l === 0) {
      return 1;
    }
    let opened = 0;
    for (let i = 0; i < l; i++) {
      const curr = S[i];
      if (opened === 0 && curr === ')') {
        opened = -1;
        break;
      } else if (curr === '(') {
        opened += 1;
      } else {
        opened -=1;
      }
    }
    if (opened === 0) {
      return 1;
    }
    return 0;
  }

  /* 7.4  */
  solution74 (A) {

  }
}

export default Lessons2.getInstance();
