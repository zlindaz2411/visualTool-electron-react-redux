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
      let parentIndex = Math.floor((currentIndex -1) / 2)
      if (
        this.items[parentIndex].priority > this.items[currentIndex].priority
      ) {
        this.swap(parentIndex, currentIndex)
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
      let left = (currentIndex  * 2 +1)
      let right =  (currentIndex  * 2 +2)
      let swap = currentIndex;
      if (left < this.items.length && this.items[currentIndex].priority > this.items[left].priority) {
          swap = left;
      }

      if (right < this.items.length && this.items[right].priority < this.items[swap].priority) {
          swap = right;
      }

      if (swap != currentIndex){
      this.swap(currentIndex,swap)
      this.bubbleDown(swap)
      }
    }

    /**
     * Swap two elements
     * @param {*} currentIndex 
     * @param {*} swap 
     */
  swap(currentIndex, swap){
    let temp = this.items[currentIndex];
    this.items[currentIndex] = this.items[swap];
    this.items[swap] = temp;
  }
  

  /**
   * Check if heap is ermpty
   */
  isEmpty() {
    return this.items.length == 0;
  }
}
