const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
      return;
    }

    const insertNode = (node, newNode) => {
      if (newNode.data < node.data) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    };

    insertNode(this.rootNode, newNode);
  }

  find(data) {
    let currentNode = this.rootNode;

    while (currentNode !== null) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }
    return null;
  }

  has(data) {
    let currentNode = this.rootNode;

    while (currentNode !== null) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }

  remove(data) {
    let currentNode = this.rootNode;
    let parentNode = null;

    while (currentNode !== null) {
      if (data < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        if (currentNode.left === null && currentNode.right === null) {
          if (parentNode === null) {
            this.rootNode = null;
          } else if (parentNode.left === currentNode) {
            parentNode.left = null;
          } else {
            parentNode.right = null;
          }
        } else if (currentNode.left === null) {
          if (parentNode === null) {
            this.rootNode = currentNode.right;
          } else if (parentNode.left === currentNode) {
            parentNode.left = currentNode.right;
          } else {
            parentNode.right = currentNode.right;
          }
        } else if (currentNode.right === null) {
          if (parentNode === null) {
            this.rootNode = currentNode.left;
          } else if (parentNode.left === currentNode) {
            parentNode.left = currentNode.left;
          } else {
            parentNode.right = currentNode.left;
          }
        } else {
          let minNodeParent = currentNode;
          let minNode = currentNode.right;

          while (minNode.left !== null) {
            minNodeParent = minNode;
            minNode = minNode.left;
          }

          currentNode.data = minNode.data;
          if (minNodeParent.left === minNode) {
            minNodeParent.left = minNode.right;
          } else {
            minNodeParent.right = minNode.right;
          }
        }
        return;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }

    return currentNode.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};