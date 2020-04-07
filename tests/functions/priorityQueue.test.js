import { PriorityQueueHeap } from "../../src/functions/lib/priorityQueue";
import { QElement } from "../../src/functions/lib/priorityQueue";

const assert = require("assert");

describe("Priority Queue class constructor", function() {
  const input = [];

  const pq = new PriorityQueueHeap();

  it("should be empty priority queue at first", function() {
    assert.deepEqual(input, pq.items);
  });
  it("should return true empty priority queue", function() {
    assert.deepEqual(true, pq.isEmpty());
  });

  it("should return an error message when dequeueing the first element from the priority queue", function() {
    assert.equal("No element", pq.extractMin());
  });
});

describe("Priority Queue Heap class insert", function() {
  let input = [];
  let pq = new PriorityQueueHeap();

  input.push(new QElement(2, 1));
  input.push(new QElement(1, 2));
  pq.insert(1, 2);
  pq.insert(2, 1);
  it("should add an element in priority queue", function() {
    assert.deepEqual(input, pq.items);
  });
});

describe("Priority Queue Heap class extractMin", function() {
  let input = [];
  let pq = new PriorityQueueHeap();

  input.push(new QElement(1, 2));
  input.push(new QElement(2, 1));
  pq.insert(1, 2);
  pq.insert(2, 1);
  let e = input.pop();

  it("should dequeue the first element from the priority queue", function() {
    assert.deepEqual(e, pq.extractMin());
  });
});
