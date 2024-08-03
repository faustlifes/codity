
class Lesson3 {

  solution1 (X = 10, Y = 10000000000, D = 3000) {
    return Math.ceil((Y - X) / D);
  }
  /*PermMissingElem Lesson3.2*/
  solution2 (A = [2]) {
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
  solution3 (A = [3,4]) {
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
}

export default Lesson3;
