import {SingletonTemplate} from '../common/singleton.template';
import {ListNode} from '../common/list-node';
import {TreeNode} from '../common/tree';

class LeetCode2 {
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
    solution28(haystack = 'leetcode', needle = 'leet') {
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
    solution69(x = 2147395600) {

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
    solution83(head = ListNode.ArrToLN([1, 1, 1, 2, 2])) {
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
    solution124(root = TreeNode.ArrToTN([2, -1, -2])) {
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

    /**
     * 62. Unique Paths
     * There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.
     * Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
     * The test cases are generated so that the answer will be less than or equal to 2 * 109.
     *
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    solution62(m = 3, n = 2) {
        const uniquePaths = function (m, n, memo = {}) {
            const key = m + ',' + n;
            if (key in memo) return memo[key];
            if (m === 1 || n === 1) return 1
            if (m === 0 || n === 0) return 0;

            memo[key] = uniquePaths(m - 1, n, memo) + uniquePaths(m, n - 1, memo);
            return memo[key];
        };
        return uniquePaths(m, n);
    }

    /** 35. Search Insert Position
     * Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
     * You must write an algorithm with O(log n) runtime complexity.
     * You must write an algorithm with O(log n) runtime complexity.
     * Example 1:
     *  Input: nums = [1,3,5,6], target = 5
     *  Output: 2
     * Example 2:
     *  Input: nums = [1,3,5,6], target = 2
     *  Output: 1
     * Example 3:
     *  Input: nums = [1,3,5,6], target = 7
     *  Output: 4
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     * */
    solution35(nums = [-3, -2, -1, 1, 3, 5, 6], target = -4) {
        let low = 0;
        let high = nums.length - 1;
        let pos = 0;

        do {
            const mid = (low + high);
            const guess = nums[mid];
            if (guess === target) {
                return mid;
            }
            if (guess > target) {
                high = mid - 1;
                pos = high >= 0 ? high : 0;
            } else {
                low = mid + 1;

                pos = low;
            }
        } while (low <= high)
        return pos;
    }

    /** 1160. Find Words That Can Be Formed by Characters
     You are given an array of strings words and a string chars.
     A string is good if it can be formed by characters from chars (each character can only be used once).
     Return the sum of lengths of all good strings in words.
     Example 1:
     Input: words = ["cat","bt","hat","tree"], chars = "atach"
     Output: 6
     Explanation: The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.
     Example 2:
     Input: words = ["hello","world","leetcode"], chars = "welldonehoneyr"
     Output: 10
     Explanation: The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.
     * @param {string[]} words
     * @param {string} chars
     * @return {number}
     * */
    solution1160(words = ['cataha', 'bt', 'hat', 'tree'], chars = 'atach') {
        let result = 0;
        for (let word of words) {
            const wordList = word.split('');
            let charList = chars.split('');

            if (wordList.every((char) => {
                let res = false;
                const idx = charList.findIndex((el) => el === char);
                if (idx > -1) {
                    charList.splice(idx, 1);
                    res = true;
                }
                return res;
            })) {
                result += word.length;
            }
        }
        return result;
    }

    /**58. Length of Last Word
     Given a string s consisting of words and spaces, return the length of the last word in the string.
     A word is a maximal substring consisting of non-space characters only.
     Example 1:
     Input: s = "Hello World"
     Output: 5
     Explanation: The last word is "World" with length 5.
     Example 2:
     Input: s = "   fly me   to   the moon  "
     Output: 4
     Explanation: The last word is "moon" with length 4.
     Example 3:
     Input: s = "luffy is still joyboy"
     Output: 6
     Explanation: The last word is "joyboy" with length 6.
     * @param {string} s
     * @return {number}
     * */
    solution58(s = '   fly me   to   the moon  ') {
        const sL = s.trim().split(' ');
        return sL[sL.length - 1].length;
    }

    /** 66. Plus One
     * You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.
     * Increment the large integer by one and return the resulting array of digits.
     * Example 1:
     *  Input: digits = [1,2,3]
     *  Output: [1,2,4]
     *  Explanation: The array represents the integer 123.
     *  Incrementing by one gives 123 + 1 = 124.
     *  Thus, the result should be [1,2,4].
     * @param {number[]} digits
     * @return {number[]}
     * */
    solution66(digits = [1, 9]) {
        for (let i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            } else {
                digits[i] = 0;
            }
        }
        digits.unshift(1);
        return digits;
    }

    /**67. Add Binary
     Given two binary strings a and b, return their sum as a binary string.
     Example 1:
     Input: a = "11", b = "1"
     Output: "100"
     Example 2:
     Input: a = "1010", b = "1011"
     Output: "10101"
     * @param {string} a
     * @param {string} b
     * @return {string}
     *
     *
     * [1,1] + [1,1] = [0,1,1,0]
     * */
    solution67(a = '1101', b = '11111') {
        const aL = a.split('');
        const bL = b.split('');
        const max = Math.max(aL.length, bL.length);

        const resL = [];
        let add = 0;

        for (let i = 0; i < max; i++) {
            if (aL.length < max) {
                aL.unshift('0');
            }
            if (bL.length < max) {
                bL.unshift('0');
            }
        }

        for (let i = aL.length - 1; i >= 0; i--) {
            const res = +aL[i] + (+bL[i] || 0) + add;
            if (res < 2) {
                resL.unshift(res);
                add = 0;
            } else if (res === 2) {
                resL.unshift(0);
                add = 1;
            } else {
                resL.unshift(1);
                add = 1;
            }
        }
        if (add) {
            resL.unshift(1);
        }
        return resL.join('');
    }

    /**70. Climbing Stairs
     You are climbing a staircase. It takes n steps to reach the top.
     Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
     Example 1:
     Input: n = 2
     Output: 2
     Explanation: There are two ways to climb to the top.
     1. 1 step + 1 step
     2. 2 steps
     Example 2:
     Input: n = 3
     Output: 3
     Explanation: There are three ways to climb to the top.
     1. 1 step + 1 step + 1 step
     2. 1 step + 2 steps
     3. 2 steps + 1 step
     * @param {number} n
     * @return {number}
     * 1 + 1 + 1 + 1 + 1
     * 1 + 2 + 2
     * 2+2+1
     * 1+1+1+2
     * 2+1+1+1
     *
     * */
    solution70(n = 5) {
        let [one, two] = [1, 1];

        for (let i = n - 1; i >= 0; i--) {
            /* using aproach fibonacci sequence
            *  but starting from the end because every of two last steps always has only 1 way */
            const temp = one;
            one = one + two;
            two = temp;
        }
        return one;
    }

    /** 5. Longest Palindromic Substring
     * Given a string s, return the longest palindromic substring in s.
     *  Example 1:
     *   Input: s = "babad"
     *   Output: "bab"
     *   Explanation: "aba" is also a valid answer.
     *  Example 2:
     *   Input: s = "cbbd"
     *   Output: "bb"
     * Constraints:
     *  1 <= s.length <= 1000
     *  s consist of only digits and English letters.
     * @param {string} s
     * @return {string}
     */
    solution5(s = 'blarttradustr') {
        if (s.length === 0) {
            return '';
        }

        function findPhrase(l, r, phr) {
            while (l >= 0 && r < phr.length && phr[l] === phr[r]) {
                l--;
                r++;
            }
            return {l: l + 1, r: r - 1};
        }

        let longest = {l: 0, r: 0};

        for (let i = 0; i < s.length; ++i) {
            const odd = findPhrase(i, i, s);
            if (odd.r - odd.l > longest.r - longest.l) {
                longest = odd;
            }
            const even = findPhrase(i, i + 1, s);
            if (even.r - even.l > longest.r - longest.l) {
                longest = even;
            }
        }
        return s.slice(longest.l, longest.r + 1);
    }
}

export default LeetCode2;