import {SingletonTemplate} from '../common/singleton.template';

let instance;

class LinkedList {
  constructor(val) {
    this.head = {
      val,
      next: null
    };
    this.length = 1;
  }
}

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

class Leetcode1 extends SingletonTemplate {
  static getInstance() {
    return super.getInstance(instance, Leetcode1);
  }

  /**
   * Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
  /**
   * @param {ListNode} l1
   * @param {ListNode} l2
   * @return {ListNode}
   * addTwoNumbers
   */
  solution1(l1 = [2, 4, 3], l2 = [5, 6, 4]) {
    var list = new LinkedList(0);
    var head = list;
    var sum = 0;
    var carry = 0;

    while (l1 || l2 || sum > 0) {

      if (l1) {
        sum += l1.val;
        l1 = l1.next;
      }
      if (l2) {
        sum += l2.val;
        l2 = l2.next;
      }
      if (sum >= 10) {
        carry = 1;
        sum -= 10;
      }

      head.next = new LinkedList(sum);
      head = head.next;

      sum = carry;
      carry = 0;

    }

    return list.next;
  }

  /*leetcode task sum3*/
  solution2(nums = [-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6]) {
    const res = [];
    nums.sort((a, b) => a - b);
    let i;
    const length = nums.length;
    for (i = 0; i < length; i++) {
      const a = nums[i];
      if (i > 0 && a === nums[i - 1]) {
        continue;
      }
      let l = i + 1;
      let r = length - 1;
      while (l < r) {
        const summ = a + nums[l] + nums[r];
        if (summ > 0) {
          r -= 1;
        } else if (summ < 0) {
          l += 1;
        } else {
          res.push([a, nums[l], nums[r]]);
          l += 1;
          while (nums[l] === nums[l - 1] && l < r) {
            l += 1;
          }
        }
      }
    }
    return res;
  }

  /*Subrectangle Queries */
  solution3(rectangle = [[1, 2, 1], [4, 3, 4], [3, 2, 1], [1, 1, 1]]) {
    /**
     * @param {number[][]} rect
     */
    var SubrectangleQueries = function (rect) {
      this.rectangle = rect;
    };

    /**
     * @param {number} row1
     * @param {number} col1
     * @param {number} row2
     * @param {number} col2
     * @param {number} newValue
     * @return {void}
     */
    SubrectangleQueries.prototype.updateSubrectangle = function (row1, col1, row2, col2, newValue) {
      for (let i = row1; i <= row2; i++) {
        for (let j = col1; j <= col2; j++) {
          this.rectangle[i][j] = newValue;
        }
      }
    };

    /**
     * @param {number} row
     * @param {number} col
     * @return {number}
     */
    SubrectangleQueries.prototype.getValue = function (row, col) {
      return this.rectangle[row][col];
    };

    /**
     * Your SubrectangleQueries object will be instantiated and called as such:
     * var obj = new SubrectangleQueries(rectangle)
     * obj.updateSubrectangle(row1,col1,row2,col2,newValue)
     * var param_2 = obj.getValue(row,col)
     */
    const queries = new SubrectangleQueries(rectangle);
    console.log(queries.getValue(0, 2));
    console.log(queries.updateSubrectangle(0, 0, 3, 2, 5));
    console.log(queries.getValue(0, 2));
    console.log(queries.getValue(3, 1));
    console.log(queries.updateSubrectangle(3, 0, 3, 2, 10));
    console.log(queries.getValue(3, 1));
    console.log(queries.getValue(0, 2));
    return null;
  }

  /**
   * @param {number[]} groupSizes
   * @return {number[][]}
   */
  solution4(groupSizes = [3, 3, 2, 3, 2, 3, 3, 1, 3]) {
    const sMap = {};
    const res = [];
    const l = groupSizes.length;
    let i;
    for (i = 0; i < l; i++) {
      if (sMap[groupSizes[i]]) {
        sMap[groupSizes[i]].push(i);
      } else {
        sMap[groupSizes[i]] = [i];
      }
      if (sMap[groupSizes[i]].length === groupSizes[i]) {
        res.push(sMap[groupSizes[i]]);
        sMap[groupSizes[i]] = [];
      }
    }
    return res;
  }

  /*Write a function that takes a string of space separated words as a single
    parameter and returns the longest word in that string. Assume that the input s
    string is always a non-empty string and the maximum length of the input string may be limitless.*/
  solution5(str = 'what time is it now, fdgdsdddddddd') {
    const wordList = str.split(' ') || [];
    wordList.sort((a, b) => b.length - a.length);
    return wordList[0];
  }

  /*Create Curry function which divide params like currySum(a)(b)(c)(d)*/
  solution6() {
    function sum(a, b, c, d) {
      return a + b + c + d;
    }

    /* I see that you push second params to
       function as count but I guess that it's
       better to use dynamic checker for parameters count*/
    function curry(f) {

      /* let create some func that
         will recursively return new function
         if passed params les then in origin function*/
      function divideParams() {
        /*convert args enumeration to array (enumeration it's na object with non iterable properties)*/
        const currentArgs = Array.prototype.slice.call(arguments);
        return currentArgs.length >= f.length ? f.apply(null, currentArgs) :
          /*check if current args less then in origin function if less return div func again with current params*/
          divideParams.bind(null, ...currentArgs);
      }

      return divideParams;
    }

    let ss = curry(sum);
    return ss(1)(2)(2)(2);
  }

  /** Given an array of integers temperatures represents the daily temperatures,
   * return an array answer such that answer[i] is the number of days you have
   * to wait after the ith day to get a warmer temperature. If there is no future
   * day for which this is possible, keep answer[i] == 0 instead.

   * Example 1:
   * Input: temperatures = [73,74,75,71,69,72,76,73] Output: [1,1,4,2,1,1,0,0]

   * Example 2:
   * Input: temperatures = [30,40,50,60] Output: [1,1,1,0]

   * Example 3:
   * Input: temperatures = [30,60,90] Output: [1,1,0]

   * Constraints: 1 <= temperatures.length <= 105, 30 <= temperatures[i] <= 100
   * @param {number[]} temperatures
   * @return {number[]}
   */
  solution7(temperatures = [11, 14, 10, 11, 9, 16]) {
    const stack = [];
    const l = temperatures.length;
    const answer = Array(l).fill(0);
    for (let i = l - 1; i >= 0; i--) {
      while (stack.length > 0 && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
        stack.pop();
      }
      if (stack.length > 0) {
        answer[i] = stack[stack.length - 1] - i;
      }
      stack.push(i);
    }
    return answer;
  }

  /* 3. Longest Substring Without Repeating Characters
   * Given a string s, find the length of the longest substring without repeating characters.
     Example 1:
       Input: s = "abcabcbb", Output: 3
       Explanation: The answer is "abc", with the length of 3.
     Example 2:
       Input: s = "bbbbb", Output: 1
       Explanation: The answer is "b", with the length of 1.
     Example 3:
       Input: s = "pwwkew", Output: 3
       Explanation: The answer is "wke", with the length of 3.
       Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
     Example 4:
       Input: s = "", Output: 0
     Constraints: 0 <= s.length <= 5 * 104, s consists of English letters, digits, symbols and spaces.
  * */
  solution8(s = 'pwwkew') {
    const charSet = new Set();
    let max = 0;
    let l = 0;
    let r = 0;
    while (r < s.length) {
      if (!charSet.has(s[r])) {
        charSet.add(s[r++]);
        max = Math.max(max, charSet.size);
      } else {
        charSet.delete(s[l++]);
      }
    }
    return max;
  }

  /*
  Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

  Symbol       Value
  I             1
  V             5
  X             10
  L             50
  C             100
  D             500
  M             1000
  For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

  Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

  I can be placed before V (5) and X (10) to make 4 and 9.
  X can be placed before L (50) and C (100) to make 40 and 90.
  C can be placed before D (500) and M (1000) to make 400 and 900.
  Given a roman numeral, convert it to an integer.



  Example 1:

  Input: s = "III"
  Output: 3
  Explanation: III = 3.
  Example 2:

  Input: s = "LVIII"
  Output: 58
  Explanation: L = 50, V= 5, III = 3.
  Example 3:

  Input: s = "MCMXCIV"
  Output: 1994
  Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
  * */
  solution9(s = 'MCMXCIV') {
    const symbols = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
    };
    const order = {'I': 0, 'V': 1, 'X': 2, 'L': 3, 'C': 4, 'D': 5, 'M': 6};
    let res = 0;

    for (let i = 0; i < s.length; i++) {
      if ((order[s[i + 1]] - order[s[i]]) > 0) {
        res += symbols[s[i + 1]] - symbols[s[i]];
        i++;
      } else {
        res += symbols[s[i]];
      }
    }
    return res;
  }

  /*
    Write a function to find the longest common prefix string amongst an array of strings.
    If there is no common prefix, return an empty string "".
      Example 1:

          Input: strs = ["flower","flow","flight"]
          Output: "fl"
      Example 2:

          Input: strs = ["dog","racecar","car"]
          Output: ""
          Explanation: There is no common prefix among the input strings.

      Constraints:

        1 <= strs.length <= 200
        0 <= strs[i].length <= 200
        strs[i] consists of only lowercase English letters.
  * */
  solution10(strs = ['flower', 'flow', 'flight', 'dddddd']) {
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
      while (strs[i].indexOf(prefix) !== 0) {
        prefix = prefix.substring(0, prefix.length - 1);
        if (!prefix.length) {
          return '';
        }
      }
    }
    return prefix;
  }

  /*
  * 21. Merge Two Sorted Lists
  * You are given the heads of two sorted linked lists list1 and list2.
    Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
    Return the head of the merged linked list.
  *
  * */

  /**
   * Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
  /**
   * @param {ListNode} list1
   * @param {ListNode} list2
   * @return {ListNode}
   */
  solution11(list1, list2) {
    list1 = {
      val: 1,
      next: {
        val: 2,
        next: {
          val: 4,
          next: null
        }
      }
    }
    list2 = {
      val: 1,
      next: {
        val: 3,
        next: {
          val: 4,
          next: null
        }
      }
    }
    if (!item1 && !item2) {
      return null;
    }
    function moveNext(item) {
      if (tail) {
        tail = tail.next = new ListNode(item.val);
      } else {
        tail = head = new ListNode(item.val)
      }
      return item.next;
    }

    let item2 = list2;
    let item1 = list1;
    let head, tail;
    while (item1 && item2) {
      if (item1.val < item2.val) {
        item1 = moveNext(item1);
      } else {
        item2 = moveNext(item2);
      }
    }
    while(item1) {
      item1 = moveNext(item1);
    }
    while(item2) {
      item2 = moveNext(item2);
    }
    return head;
  }

  /**
   * 26. Remove Duplicates from Sorted Array
   * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique
   * element appears only once. The relative order of the elements should be kept the same.
   * Since it is impossible to change the length of the array in some languages, you must instead have the result
   * be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates,
   * then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.
   * Return k after placing the final result in the first k slots of nums.
   * Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.
   *
   * @param {number[]} nums
   * @return {number}
   */
  solution12(nums= [0,0,1,2,2,4,4,5]) {

    let addIndex = 1;
    for (let i = 0; i < nums.length; i++) {
      if(nums[i] < nums[i + 1]) {
        nums[addIndex] = nums[i + 1];
        addIndex++;
      }
    }
    return addIndex;
  }

  /**
   * 27. Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
   * The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
   * Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:
   *   Change the array nums such that the first k elements of nums contain the elements which are not equal to val.
   *   The remaining elements of nums are not important as well as the size of nums.
   * Return k.
   *
   * @param {number[]} nums
   * @param {number} val
   * @return {number}
   *
  * */
  solution13(nums = [3,2,2,3], val = 3) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === val) {
        count += 1;
        nums[i] = -1;
      }
    }
    nums.sort((a,b) => b - a);
    return nums.length - count;
  }
}

export default Leetcode1.getInstance();
