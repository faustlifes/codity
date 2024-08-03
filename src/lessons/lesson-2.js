
class Lesson2 {
  /*OddOccurrencesInArray lesson2.1*/
  solution1 (A =
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
  solution2 (A = [42,34], K = 1) {
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
}

export default Lesson2;