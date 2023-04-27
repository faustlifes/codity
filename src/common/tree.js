/** Definition for a binary tree node.*/

export class TreeNode {

  constructor(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
  }
  static ArrToTN(arr=[]) {
/**                      1
              2                    3
         4            5            6             7
     8     9      10    11     12     13      14     15
  16  17 18 19  20 21 22 23  24 25  26 27   28 29  30 31
*/
    function fillRoot(arr, i = 0) {
      let root;
      if (i < arr.length) {
        root = root || new TreeNode();
        root.val = arr[i];
        root.left = fillRoot(arr, 2*i + 1);
        root.right = fillRoot(arr, 2*i + 2);
      }
      return root;
    }

    return fillRoot(arr);
  }
}