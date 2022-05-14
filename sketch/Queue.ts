class Queue {
  items: any[];
  constructor() {
    this.items = [];
  }
  enqueue(element: any) {
    this.items.push(element);
  }
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    } else {
      return this.items.shift();
    }
  }
  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
}
