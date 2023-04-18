export class LinkedList {
  constructor(val) {
    this.head = {
      val,
      next: null
    };
    this.length = 1;
  }
}


export class ListNode {
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
  /**
   * @param {Array} arr
   * @return {ListNode}
   * */
  static ArrToLN(arr=[1,2,3,4,5]) {
    const head = new ListNode();
    let curr = head;
    head.val = arr[0];
    for (let i = 1; i < arr.length; i++) {
      curr.next = new ListNode(arr[i]);
      curr = curr.next;
    }
    return head;
  }
}


