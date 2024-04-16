
/*count range sum from prefix sum A[i,j] = A[j] - A[i - 1]*/
class Lesson5 {

  /*count range sum from prefix sum A[i,j] = A[j] - A[i - 1]*/
  /* LESSON 5.1 PassingCars */
  solution1 (A = [0,1,0,1,1,0,1,1]) {
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
  solution2 (S = 'CAGCCTA', P = [2,5,0], Q = [4,5,6]) {
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
  solution3 (A = 6, B = 11, K = 2) {
    const minVal = Math.floor((A + K - 1) / K) * K;
    if (minVal > B) {
      return 0;
    }

    return Math.floor((B - minVal) / K) + 1;
  }
  /*LESSON 5.4 MinAvgTwoSlice */
  solution4 (A = [4,2,2,5,1,5,8]) {
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
}

export default Lesson5;
