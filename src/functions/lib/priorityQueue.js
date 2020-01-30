export class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

export class PriorityQueueHeap {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }

  /**
   * Insert element in the heap given priority
   * @param {*} element 
   * @param {*} priority 
   */
  insert(element, priority) {
    // creating object from queue element
    let qElement = new QElement(element, priority);
    this.items.push(qElement);
    this.bubbleUp(this.items.length - 1);
  }
  /**
   * Restore the heap order after adding element to the heap
   * @param {*} currentIndex 
   */
  bubbleUp(currentIndex) {
    while (currentIndex > 0) {
      let parentIndex = Math.floor(currentIndex / 2);
      if (
        this.items[parentIndex].priority > this.items[currentIndex].priority
      ) {
        let temp = this.items[parentIndex];
        this.items[parentIndex] = this.items[currentIndex];
        this.items[currentIndex] = temp;
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Extract the minimum element which is at root
   */
  extractMin() {
    try{
    if(this.isEmpty()) throw "No element"
    let result = this.items[0];
    let leaf = this.items.pop();

    if (this.items.length > 0) {
      this.items[0] = leaf;
      this.bubbleDown(0);
    }
    return result;
  }catch(e){
    return e.toString()
  }
  }

  /**
   * Restore the order after delete the minimum element;
   * @param {*} currentIndex 
   */
  bubbleDown(currentIndex) {
    while (true) {
      let child2Index = (currentIndex + 1) * 2;
      let child1Index = child2Index - 1;
      let swap = null;
      if (child1Index < this.items.length) {
        let child1 = this.items[child1Index];
        if (this.items[currentIndex].priority > child1.priority) {
          swap = child1Index;
        }
      }

      if (child2Index < this.items.length) {
        let child2 = this.items[child2Index];
        if (
          swap == null
            ? this.items[currentIndex].priority
            : this.items[child1Index].priority > child2.priority
        ) {
          swap = child2Index;
        }
      }

      if (swap == null) break;

      let temp = this.items[currentIndex];
      this.items[currentIndex] = this.items[swap];
      this.items[swap] = temp;
      currentIndex = swap;
    }
  }

  /**
   * Check if heap is ermpty
   */
  isEmpty() {
    return this.items.length == 0;
  }
}
