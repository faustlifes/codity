
class Lesson7 {

  /* LESSON 7 Brackets*/
  solution1 (S = '{[()()]}') {
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
  solution2 (A = [4, 3, 2, 1, 5], B = [0, 1, 0, 0, 0]) {
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
  solution3 (S = ')()(())') {
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
  solution4 (A) {

  }
}

export default Lesson7;
