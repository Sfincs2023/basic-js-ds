const { NotImplementedError } = require('../lib/errors');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  getUnderlyingList() {
    if (!this.head) return null;

    const result = { value: this.head.value, next: null };
    let currentResultNode = result;
    let currentQueueNode = this.head.next;

    while (currentQueueNode) {
      currentResultNode.next = { value: currentQueueNode.value, next: null };
      currentResultNode = currentResultNode.next;
      currentQueueNode = currentQueueNode.next;
    }

    return result;
  }

  enqueue(value) {
    const newNode = new ListNode(value);
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
  }

  dequeue() {
    if (!this.head) return;
    const removedValue = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    return removedValue;
  }
}

module.exports = {
  Queue
};
