import {SingletonTemplate} from '../common/singleton.template';

let instance;

class Leetcode2 extends SingletonTemplate {
  static getInstance() {
    return super.getInstance(instance, Leetcode2);
  }

  /**
   * 28. Find the Index of the First Occurrence in a String
   * Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
   *
   * Example 1:
   *
   * Input: haystack = "sadbutsad", needle = "sad"
   * Output: 0
   * Explanation: "sad" occurs at index 0 and 6.
   * The first occurrence is at index 0, so we return 0.
   * Example 2:
   *
   * Input: haystack = "leetcode", needle = "leeto"
   * Output: -1
   * Explanation: "leeto" did not occur in "leetcode", so we return -1.
   *
   * Constraints:
   *
   * 1 <= haystack.length, needle.length <= 104
   * haystack and needle consist of only lowercase English characters.
   *
   * * @param {string} haystack
   *  * @param {string} needle
   *  * @return {number}
   * */
  solution1(haystack = 'leetcode', needle = 'leet') {
    return haystack.indexOf(needle);
  }

  /**
   * 69. Sqrt(x)
   * Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.
   * You must not use any built-in exponent function or operator.
   * For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.
   * Example 1:
   *   Input: x = 4
   *   Output: 2
   *   Explanation: The square root of 4 is 2, so we return 2.
   * Example 2:
   *   Input: x = 8
   *   Output: 2
   *   Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
   *
   * Constraints:
   *   0 <= x <= 231 - 1
   * */
  solution2(x = 2147395600) {

    if (x === 0 || x === 1) {
      return x;
    }
    let counter = 2;
    while (true) {
      if (counter * counter > x) {
        break;
      }
      counter++
    }
    return counter - 1;
  }
}

export default Leetcode2.getInstance();