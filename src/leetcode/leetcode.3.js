import {TreeNode} from '../common/tree';

class LeetCode3 {

  /** 1832. Check if the Sentence Is Pangram
   A pangram is a sentence where every letter of the English alphabet appears at least once.
   Given a string sentence containing only lowercase English letters, return true if sentence is a pangram, or false otherwise.
   Example 1:
   Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
   Output: true
   Explanation: sentence contains at least one of every letter of the English alphabet.
   Example 2:
   Input: sentence = "leetcode"
   Output: false
   Constraints: 1 <= sentence.length <= 1000 sentence consists of lowercase English letters.
   * */
  /**
   * @param {string} sentence
   * @return {boolean}
   */
  solution1832(sentence = 'thequickbrownfoxjumpsoverthelazydog') {
    const l = sentence.length;
    const map = new Map([['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g'], ['h'], ['i'], ['j'], ['k'], ['l'], ['m'], ['n'], ['o'], ['p'], ['q'], ['r'], ['s'], ['t'], ['u'], ['v'], ['w'], ['x'], ['y'], ['z']]);
    let i = 0;
    for (i; i < l; i++) {
      if (map.has(sentence[i])) {
        map.delete(sentence[i]);
      }
    }
    return map.size === 0;
  }

  /** 1779. Find Nearest Point That Has the Same X or Y Coordinate
   You are given two integers, x and y, which represent your current location on a Cartesian grid: (x, y). You are also given an array points where each points[i] = [ai, bi] represents that a point exists at (ai, bi). A point is valid if it shares the same x-coordinate or the same y-coordinate as your location.
   Return the index (0-indexed) of the valid point with the smallest Manhattan distance from your current location. If there are multiple, return the valid point with the smallest index. If there are no valid points, return -1.
   The Manhattan distance between two points (x1, y1) and (x2, y2) is abs(x1 - x2) + abs(y1 - y2).
   Example 1:
   Input: x = 3, y = 4, points = [[1,2],[3,1],[2,4],[2,3],[4,4]]
   Output: 2
   Explanation: Of all the points, only [3,1], [2,4] and [4,4] are valid. Of the valid points, [2,4] and [4,4] have the smallest Manhattan distance from your current location, with a distance of 1. [2,4] has the smallest index, so return 2.
   Example 2:
   Input: x = 3, y = 4, points = [[3,4]]
   Output: 0
   Explanation: The answer is allowed to be on the same location as your current location.
   Example 3:
   Input: x = 3, y = 4, points = [[2,3]]
   Output: -1
   Explanation: There are no valid points.
   Constraints: 1 <= points.length <= 104, points[i].length == 2, 1 <= x, y, ai, bi <= 104
   * */
  /**
   * @param {number} x
   * @param {number} y
   * @param {number[][]} points
   * @return {number}
   */
  solution1779(x = 3, y = 4, points = [[1, 2], [3, 1], [2, 4], [2, 3], [4, 4]]) {
    let minDist = Infinity;
    let minIndex = -1;
    for (let i = 0; i < points.length; i++) {
      if (points[i][0] === x || points[i][1] === y) {
        const dist = Math.abs(points[i][1] - y) + Math.abs(points[i][0] - x);
        if (dist < minDist) {
          minDist = dist;
          minIndex = i;
        }
      }
    }
    return minIndex;
  }

  /** 1689. Partitioning Into Minimum Number Of Deci-Binary Numbers
   * A decimal number is called deci-binary if each of its digits is either 0 or 1 without any leading zeros. For example, 101 and 1100 are deci-binary, while 112 and 3001 are not.
   Given a string n that represents a positive decimal integer, return the minimum number of positive deci-binary numbers needed so that they sum up to n.
   Example 1:
   Input: n = "32"
   Output: 3
   Explanation: 10 + 11 + 11 = 32
   Example 2:
   Input: n = "82734"
   Output: 8
   Example 3:
   Input: n = "27346209830709182346"
   Output: 9
   Constraints:
   1 <= n.length <= 105, n consists of only digits., n does not contain any leading zeros and represents a positive integer.
   * */
  /**
   * @param {string} n
   * @return {number}
   */
  solution1689(n = '32') {
    const digits = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    for (const item of digits) {
      if (n.includes(item)) {
        return item;
      }
    }
    return 0;
  }

  /** 1603. Design Parking System
   * Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.
   * Implement the ParkingSystem class:
   *   ParkingSystem(int big, int medium, int small) Initializes object of the ParkingSystem class. The number of slots for each parking space are given as part of the constructor.
   *   bool addCar(int carType) Checks whether there is a parking space of carType for the car that wants to get into the parking lot. carType can be of three kinds: big, medium, or small, which are represented by 1, 2, and 3 respectively. A car can only park in a parking space of its carType. If there is no space available, return false, else park the car in that size space and return true.
   * Example 1:
   * Input
   *   ["ParkingSystem", "addCar", "addCar", "addCar", "addCar"]
   *   [[1, 1, 0], [1], [2], [3], [1]]
   *   Output
   *   [null, true, true, false, false]
   * Explanation
   *   ParkingSystem parkingSystem = new ParkingSystem(1, 1, 0);
   *   parkingSystem.addCar(1); // return true because there is 1 available slot for a big car
   *   parkingSystem.addCar(2); // return true because there is 1 available slot for a medium car
   *   parkingSystem.addCar(3); // return false because there is no available slot for a small car
   *   parkingSystem.addCar(1); // return false because there is no available slot for a big car. It is already occupied.
   * Constraints: 0 <= big, medium, small <= 1000, carType is 1, 2, or 3, At most 1000 calls will be made to addCar
   * */
  solution1603() {
    const res = [null];
    /**
     * @param {number} big
     * @param {number} medium
     * @param {number} small
     */
    const ParkingSystem = function (big, medium, small) {
      this.parking = {
        '1': big,
        '2': medium,
        '3': small
      };
    };

    /**
     * @param {number} carType
     * @return {boolean}
     */
    ParkingSystem.prototype.addCar = function (carType) {
      if (!this.parking[carType]) {
        return false;
      }
      this.parking[carType] -= 1;
      return true;
    }
    const parkingSystem = new ParkingSystem(1, 1, 0);
    res.push(parkingSystem.addCar(1)); // return true because there is 1 available slot for a big car
    res.push(parkingSystem.addCar(2)); // return true because there is 1 available slot for a medium car
    res.push(parkingSystem.addCar(3)); // return false because there is no available slot for a small car
    res.push(parkingSystem.addCar(1)); // return false because there is no available slot for a big car. It is already occupied.

    return res;
  }

  /** 1512. Number of Good Pairs
   *   Given an array of integers nums, return the number of good pairs.
   *   A pair (i, j) is called good if nums[i] == nums[j] and i < j.
   * Example 1:
   *   Input: nums = [1,2,3,1,1,3]
   *   Output: 4
   *   Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
   * Example 2:
   *   Input: nums = [1,1,1,1]
   *   Output: 6
   *   Explanation: Each pair in the array are good.
   * Example 3:
   *   Input: nums = [1,2,3]
   *   Output: 0
   * Constraints: 1 <= nums.length <= 100, 1 <= nums[i] <= 100
   * */
  /**
   * @param {number[]} nums
   * @return {number}
   */
  solution1512(nums = [1, 2, 3, 1, 1, 3]) {
    const pairs = {};
    let counter = 0;
    for (let i = 0; i < nums.length; i++) {
      if (pairs[nums[i].toString()]) {
        counter += pairs[nums[i].toString()];
        pairs[nums[i].toString()] += 1;
      } else {
        pairs[nums[i].toString()] = 1;
      }

    }
    return counter;
  }

  /** 1480. Running Sum of 1d Array
   * Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
   * Return the running sum of nums.
   * Example 1:
   *   Input: nums = [1,2,3,4]
   *   Output: [1,3,6,10]
   *   Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].
   * Example 2:
   *   Input: nums = [1,1,1,1,1]
   *   Output: [1,2,3,4,5]
   *   Explanation: Running sum is obtained as follows: [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1].
   * Example 3:
   *   Input: nums = [3,1,2,10,1]
   *   Output: [3,4,6,16,17]
   * Constraints: 1 <= nums.length <= 1000, -10^6 <= nums[i] <= 10^6
   * */
  /**
   * @param {number[]} nums
   * @return {number[]}
   */
  solution1480(nums) {
    const runningSum = [nums[0]];
    let i;
    for (i = 1; i < nums.length; i++) {
      runningSum.push(runningSum[i - 1] + nums[i]);
    }
    return runningSum;
  }

  /** 1470. Shuffle the Array
   *   Given the array nums consisting of 2n elements in the form [x1,x2,...,xn,y1,y2,...,yn].
   *   Return the array in the form [x1,y1,x2,y2,...,xn,yn].
   * Example 1:
   *   Input: nums = [2,5,1,3,4,7], n = 3
   *   Output: [2,3,5,4,1,7]
   *   Explanation: Since x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 then the answer is [2,3,5,4,1,7].
   * Example 2:
   *   Input: nums = [1,2,3,4,4,3,2,1], n = 4
   *   Output: [1,4,2,3,3,2,4,1]
   * Example 3:
   *   Input: nums = [1,1,2,2], n = 2
   *   Output: [1,2,1,2]
   * Constraints: 1 <= n <= 500, nums.length == 2n, 1 <= nums[i] <= 10^3
   * */
  /**
   * @param {number[]} nums
   * @param {number} n
   * @return {number[]}
   */
  solution1470(nums, n) {
    const res = [];
    for (let i = 0; i < n; i++) {
      res.push(nums[i], nums[n + i]);
    }
    return res;
  };

  /** 1431. Kids With the Greatest Number of Candies
   * There are n kids with candies. You are given an integer array candies, where each candies[i] represents the number of candies the ith kid has, and an integer extraCandies, denoting the number of extra candies that you have.
   * Return a boolean array result of length n, where result[i] is true if, after giving the ith kid all the extraCandies, they will have the greatest number of candies among all the kids, or false otherwise.
   * Note that multiple kids can have the greatest number of candies.
   * Example 1:
   *   Input: candies = [2,3,5,1,3], extraCandies = 3
   *   Output: [true,true,true,false,true]
   *   Explanation: If you give all extraCandies to:
   *   - Kid 1, they will have 2 + 3 = 5 candies, which is the greatest among the kids.
   *   - Kid 2, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
   *   - Kid 3, they will have 5 + 3 = 8 candies, which is the greatest among the kids.
   *   - Kid 4, they will have 1 + 3 = 4 candies, which is not the greatest among the kids.
   *   - Kid 5, they will have 3 + 3 = 6 candies, which is the greatest among the kids.
   * Example 2:
   *   Input: candies = [4,2,1,1,2], extraCandies = 1
   *   Output: [true,false,false,false,false]
   *   Explanation: There is only 1 extra candy.
   *   Kid 1 will always have the greatest number of candies, even if a different kid is given the extra candy.
   * Example 3:
   *  Input: candies = [12,1,12], extraCandies = 10
   *  Output: [true,false,true]
   *  Constraints: n == candies.length, 2 <= n <= 100, 1 <= candies[i] <= 100, 1 <= extraCandies <= 50
   * */
  /**
   * @param {number[]} candies
   * @param {number} extraCandies
   * @return {boolean[]}
   */
  solution1431(candies = [2, 3, 5, 1, 3], extraCandies = 3) {
    const max = Math.max(...candies);
    return candies.map(child => max <= child + extraCandies);
  }

  /** 1379. Find a Corresponding Node of a Binary Tree in a Clone of That Tree
   * Given two binary trees original and cloned and given a reference to a node target in the original tree.
   * The cloned tree is a copy of the original tree.
   * Return a reference to the same node in the cloned tree.
   * Note that you are not allowed to change any of the two trees or the target node and the answer must be a reference to a node in the cloned tree.
   * */
  /**
   * @return {TreeNode}
   */
  solution1379() {
    /**
     * @param {TreeNode} original
     * @param {TreeNode} cloned
     * @param {TreeNode} target
     * @return {TreeNode}
     */
    function getTargetCopy(original, cloned, target) {
      if (!cloned) {
        return null;
      }

      if (cloned.val === target.val) {
        return cloned;
      }
      return getTargetCopy(original, cloned.left, target) || getTargetCopy(original, cloned.right, target);
    }

    const tree = TreeNode.ArrToTN([7, 4, 3, null, null, 6, 19]),
      cloned = TreeNode.ArrToTN([7, 4, 3, null, null, 6, 19]),
      target = 3
    return getTargetCopy(tree, cloned, target);
  }

  /** 1108. Defanging an IP Address
   * Given a valid (IPv4) IP address, return a defanged version of that IP address.
   * A defanged IP address replaces every period "." with "[.]".
   * Example 1:
   *   Input: address = "1.1.1.1"
   *   Output: "1[.]1[.]1[.]1"
   * Example 2:
   *   Input: address = "255.100.50.0"
   *   Output: "255[.]100[.]50[.]0"
   * Constraints: The given address is a valid IPv4 address.
   * @param {string} address
   * @return {string}
   * */
  solution1108(address) {
    return address.split('.').join('[.]');
  }

  /** 966. Vowel Spellchecker
   * Given a wordlist, we want to implement a spellchecker that converts a query word into a correct word.
   * For a given query word, the spell checker handles two categories of spelling mistakes:
   * Capitalization: If the query matches a word in the wordlist (case-insensitive), then the query word is returned with the same case as the case in the wordlist.
   * Example: wordlist = ["yellow"], query = "YellOw": correct = "yellow"
   * Example: wordlist = ["Yellow"], query = "yellow": correct = "Yellow"
   * Example: wordlist = ["yellow"], query = "yellow": correct = "yellow"
   * Vowel Errors: If after replacing the vowels ('a', 'e', 'i', 'o', 'u') of the query word with any vowel individually, it matches a word in the wordlist (case-insensitive), then the query word is returned with the same case as the match in the wordlist.
   * Example: wordlist = ["YellOw"], query = "yollow": correct = "YellOw"
   * Example: wordlist = ["YellOw"], query = "yeellow": correct = "" (no match)
   * Example: wordlist = ["YellOw"], query = "yllw": correct = "" (no match)
   * In addition, the spell checker operates under the following precedence rules:
   * When the query exactly matches a word in the wordlist (case-sensitive), you should return the same word back.
   * When the query matches a word up to capitlization, you should return the first such match in the wordlist.
   * When the query matches a word up to vowel errors, you should return the first such match in the wordlist.
   * If the query has no matches in the wordlist, you should return the empty string.
   * Given some queries, return a list of words answer, where answer[i] is the correct word for query = queries[i].
   * Example 1:
   *   Input: wordlist = ["KiTe","kite","hare","Hare"], queries = ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"]
   *   Output: ["kite","KiTe","KiTe","Hare","hare","","","KiTe","","KiTe"]
   * Example 2:
   *   Input: wordlist = ["yellow"], queries = ["YellOw"]
   *   Output: ["yellow"]
   * */
  solution966(wordlist, queries) {
    const origin = new Set(wordlist), lower = new Map(), mask = new Map();
    const regex = /[aeiou]/g;

    for (let i = wordlist.length - 1; ~i; i--) {
      const word = wordlist[i];
      const wlow = word.toLowerCase();
      lower.set(wlow, word);
      mask.set(wlow.replace(regex, '*'), word);
    }
    for (let q in queries) {
      const query = queries[q];
      const qlow = query.toLowerCase();
      const qmask = qlow.replace(regex, '*');
      if (origin.has(queries[q])) {
        continue;
      } else {
        queries[q] = lower.get(qlow) || mask.get(qmask) || '';
      }

    }
    return queries;
  }

  /** 824. Goat Latin
   * You are given a string sentence that consist of words separated by spaces. Each word consists of lowercase and uppercase letters only.
   * We would like to convert the sentence to "Goat Latin" (a made-up language similar to Pig Latin.) The rules of Goat Latin are as follows:
   * If a word begins with a vowel ('a', 'e', 'i', 'o', or 'u'), append "ma" to the end of the word.
   * For example, the word "apple" becomes "applema".
   * If a word begins with a consonant (i.e., not a vowel), remove the first letter and append it to the end, then add "ma".
   * For example, the word "goat" becomes "oatgma".
   * Add one letter 'a' to the end of each word per its word index in the sentence, starting with 1.
   * For example, the first word gets "a" added to the end, the second word gets "aa" added to the end, and so on.
   * Return the final sentence representing the conversion from sentence to Goat Latin.
   * Example 1:
   *   Input: sentence = "I speak Goat Latin"
   *   Output: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
   * Example 2:
   *   Input: sentence = "The quick brown fox jumped over the lazy dog"
   *   Output: "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"
   * @param {string} S
   * @return {string}
   */
  solution824(S) {
    const wordList = S.split(' ');
    const vowels = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u'];
    return wordList.map((word, i) => {
      let newWord = word;
      if (!vowels.includes(word[0])) {
        newWord = word.substring(1, word.length) + word[0];
      }
      newWord += 'ma' + 'a'.repeat(i + 1);
      return newWord;
    }).join(' ');
  }

  /** 807. Max Increase to Keep City Skyline
   * There is a city composed of n x n blocks, where each block contains a single building shaped like a vertical square prism. You are given a 0-indexed n x n integer matrix grid where grid[r][c] represents the height of the building located in the block at row r and column c.
   * A city's skyline is the outer contour formed by all the building when viewing the side of the city from a distance. The skyline from each cardinal direction north, east, south, and west may be different.
   * We are allowed to increase the height of any number of buildings by any amount (the amount can be different per building). The height of a 0-height building can also be increased. However, increasing the height of a building should not affect the city's skyline from any cardinal direction.
   * Return the maximum total sum that the height of the buildings can be increased by without changing the city's skyline from any cardinal direction.
   * @param {number[][]} grid
   * @return {number}
   */
  solution807(grid) {
    const l = grid.length;
    let diff = 0;
    const rawMaxes = [];
    const colMaxes = [];

    for (let row = 0; row < l; row++) {
      rawMaxes[row] = 0;
      for (let col = 0; col < grid[row].length; col++) {
        if (row === 0) {
          colMaxes[col] = 0;
        }
        rawMaxes[row] = Math.max(rawMaxes[row], grid[row][col]);
        colMaxes[col] = Math.max(colMaxes[col], grid[row][col]);
      }
    }

    for (let row = 0; row < l; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const max = Math.min(rawMaxes[row], colMaxes[col]);
        diff += max - grid[row][col]
      }
    }
    return diff;
  }

  /** 771. Jewels and Stones
   *  You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. Each character in stones is a type of stone you have. You want to know how many of the stones you have are also jewels.
   *  Letters are case sensitive, so "a" is considered a different type of stone from "A".
   *  Example 1:
   *    Input: jewels = "aA", stones = "aAAbbbb"
   *    Output: 3
   *  Example 2:
   *    Input: jewels = "z", stones = "ZZ"
   *    Output: 0
   * @param {string} jewels
   * @param {string} stones
   * @return {number}
   * */
  solution771(jewels = 'aA', stones = 'aAAbbbb') {
    let count = 0;
    for (let jew of jewels) {
      for (let sto of stones) {
        if (sto === jew) {
          count++
        }
      }
    }
    return count;
  }

  /** 258. Add Digits
   * Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.
   * Example 1
   *   Input: num = 38
   *   Output: 2
   * Explanation: The process is
   *   38 --> 3 + 8 --> 11
   *   11 --> 1 + 1 --> 2
   *  Since 2 has only one digit, return it.
   * Example 2:
   *   Input: num = 0
   *   Output: 0
   * @param {number} num
   * @return {number}
   * */
  solution258(num = 48) {
    function digits(arr = '') {
      if (arr.length === 1) return Number(arr);
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i]);
      }
      return digits(sum.toString());
    }

    return digits(num.toString());
  }

  /** 211. Design Add and Search Words Data Structure
   * Design a data structure that supports adding new words and finding if a string matches any previously added string.
   * Implement the WordDictionary class:
   * WordDictionary() Initializes the object.
   * void addWord(word) Adds word to the data structure, it can be matched later.
   * bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
   * Example:
   *  Input
   *   ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
   *   [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
   * Output
   *  [null,null,null,null,false,true,true,true]
   * Explanation
   *   WordDictionary wordDictionary = new WordDictionary();
   *   wordDictionary.addWord("bad");
   *   wordDictionary.addWord("dad");
   *   wordDictionary.addWord("mad");
   *   wordDictionary.search("pad"); // return False
   *   wordDictionary.search("bad"); // return True
   *   wordDictionary.search(".ad"); // return True
   *   wordDictionary.search("b.."); // return True
   * * @param {string} word
   * @return {void}
   * */
  solution211() {

    class WordDictionary {
      constructor() {
        this.dictionary = new Map();
      }

      addWord(word) {
        const {length} = word;
        if (!this.dictionary.has(length)) {
          this.dictionary.set(length, new Set());
        }
        this.dictionary.get(length).add(word);
      }

      search(word) {
        if (!this.dictionary.has(word.length)) return false;

        const list = this.dictionary.get(word.length);
        if (!word.includes('.')) return list.has(word);

        for (const candidateWord of list) {
          let match = true;

          for (let i = 0; i < word.length; i++) {
            if (word[i] !== '.' && word[i] !== candidateWord[i]) {
              match = false;
              break;
            }
          }

          if (match) return true;
        }

        return false;
      }
    }

    const wordDictionary = new WordDictionary();
    wordDictionary.addWord('bad');
    wordDictionary.addWord('dad');
    wordDictionary.addWord('mad');
    console.log(wordDictionary.search('pad')); // return False
    console.log(wordDictionary.search('bad')); // return True
    console.log(wordDictionary.search('.ad')); // return True
    console.log(wordDictionary.search('b..')); // return True
  }

  /** 202. Happy Number
   * Write an algorithm to determine if a number n is happy.
   * A happy number is a number defined by the following process:
   * Starting with any positive integer, replace the number by the sum of the squares of its digits.
   * Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
   * Those numbers for which this process ends in 1 are happy.
   * Return true if n is a happy number, and false if not.
   * Example 1:
   *  Input: n = 19
   *  Output: true
   * Explanation:
   *   12 + 92 = 82
   *   82 + 22 = 68
   *   62 + 82 = 100
   *   12 + 02 + 02 = 1
   * Example 2:
   *  Input: n = 2
   *  Output: false
   * @param {number} n
   * @return {boolean}
   * */
  solution202(n) {
    let past = [n];
    while (n > 6) {
      let m = 0;
      let l = n;
      while (l > 0) {
        m = m + (l % 10) ** 2;
        l = Math.floor(l / 10);
      }
      n = m;
      if (past.includes(n)) return false; else past.push(n);
      console.log(n);
    }
    return n === 1;
  }

  /** 55. Jump Game
   * You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
   * Return true if you can reach the last index, or false otherwise.
   * Example 1:
   *   Input: nums = [2,3,1,1,4]
   *   Output: true
   *   Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
   * Example 2:
   *   Input: nums = [3,2,1,0,4]
   *   Output: false
   *   Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
   * */
  solution55(nums = [3, 2, 1, 0, 4]) {
    let curFar = nums[0];
    let curEnd = 0;
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
      curFar = Math.max(curFar, nums[i] + i);

      if (i === curEnd) {
        curEnd = curFar;
        ans++;
      }
    }
    return curEnd >= nums.length - 1;
  }

  /** 20. Valid Parentheses
   * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
   * An input string is valid if:
   * Open brackets must be closed by the same type of brackets.
   * Open brackets must be closed in the correct order.
   * Every close bracket has a corresponding open bracket of the same type.
   * Example 1:
   *   Input: s = "()"
   *   Output: true
   * Example 2:
   *   Input: s = "()[]{}"
   *   Output: true
   * Example 3:
   *   Input: s = "(]"
   *   Output: false
   *  @param {string} s
   *  @return {boolean}
   * */
  solution20(s) {
    const l = s.length;
    if (l % 2 !== 0) {
      return 0;
    }
    const pairs = {'{': '}', '(': ')', '[': ']'};
    const openBrackets = ['{', '[', '('];
    const stack = [];

    for (let i = 0; i < l; i++) {
      if (openBrackets.includes(s[i])) {
        stack.push(s[i]);
      } else if (s[i] === pairs[stack[stack.length - 1]]) {
        stack.pop();
      } else {
        return false;
      }
    }
    if (stack.length === 0) {
      return true;
    }
    return false;
  }
}

export default LeetCode3;