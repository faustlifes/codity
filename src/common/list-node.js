/**
 * list-node.js
 * Defines LinkedList and ListNode classes for singly-linked list operations.
 */

export class LinkedList {
  /**
   * Creates a new LinkedList with a single node.
   * @param {*} val - Initial value for the head node.
   */
  constructor(val) {
    this.head = {
      val,
      next: null
    };
    this.length = 1;
  }
}

export class ListNode {
  /**
   * Creates a new ListNode.
   * @param {*} val - Value for the node.
   * @param {ListNode|null} next - Reference to the next node.
   */
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }

  /**
   * Converts an array to a linked list of ListNode objects.
   * @param {Array} arr - Array of values.
   * @return {ListNode} - Head of the linked list.
   */
  static ArrToLN(arr = [1, 2, 3, 4, 5]) {
    const head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
      curr.next = new ListNode(arr[i]);
      curr = curr.next;
    }
    return head;
  }

  /**
   * Deletes the first node with the given key from the linked list.
   * @param {*} key - Value to delete.
   * @return {ListNode} - Head of the modified list.
   */
  deleteNode(key) {
    let head = this;
    let temp = this;
    let prev;
    if (temp && temp.val === key) {
      head = temp.next;
      return head;
    }
    while (temp && temp.val !== key) {
      prev = temp;
      temp = temp.next;
    }
    if (!temp) {
      return head;
    }
    prev.next = temp.next;
    return head;
  }
}


