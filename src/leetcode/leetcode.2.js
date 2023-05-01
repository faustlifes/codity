import {SingletonTemplate} from '../common/singleton.template';
import {ListNode} from '../common/list-node';
import {TreeNode} from '../common/tree';

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

  /**
   * 83. Remove Duplicates from Sorted List
   * Easy
   * 7.1K
   * 243
   * Companies
   * Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.
   *
   * */
  /**
   * @param {ListNode} head
   * @return {ListNode}
   */
  solution3(head = ListNode.ArrToLN([1, 1, 1, 2, 2])) {
    let curr = head;
    if (head) {
      while (!!curr && !!curr.next) {
        if (curr.val === curr.next.val) {
          curr.next = curr.next.next;
        } else {
          curr = curr.next;
        }
      }
    }
    return head;
  }

  /** 124. Binary Tree Maximum Path Sum
   *  * @param {TreeNode} root
   *  * @return {number}
   * */
  solution4(root = TreeNode.ArrToTN([2, -1, -2])) {
    let answer = Number.NEGATIVE_INFINITY;

    function helper(node) {
      if (!node) {
        return 0;
      }
      const leftMax = helper(node.left);
      const rightMax = helper(node.right);
      let temp = node.val + leftMax + rightMax;
      answer = Math.max(temp, answer, node.val + leftMax, node.val, node.val + rightMax);
      return Math.max(node.val, node.val + leftMax, node.val + rightMax);
    }

    helper(root);
    return answer;
  }
}

export default Leetcode2.getInstance();