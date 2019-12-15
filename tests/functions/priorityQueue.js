import { PriorityQueue } from "../../src/functions/lib/priorityQueue";
import { QElement } from "../../src/functions/lib/priorityQueue";

const assert = require('assert');

describe("Priority Queue class constructor", function() {
    const input =[]
    
    const pq = new PriorityQueue();

    it("should be empty priority queue at first", function() {
      assert.deepEqual(input, pq.items);
    });

    it("should return an error message when dequeueing the first element from the priority queue", function() {
        assert.equal("Underflow", pq.dequeue());
      });
  
    it("should return an error message when getting the front element of the priority queue", function() {
        assert.equal("No elements in Queue", pq.front());
        });

    it("should return  an error message when getting the rear element of the priority queue", function() {
        assert.equal("No elements in Queue", pq.rear());
    });

  });


  describe("Priority Queue class enqueue", function() {
    let input =[]
    let pq = new PriorityQueue();

    input.push(new QElement(2,1))
    input.push(new QElement(1,2))
    pq.enqueue(1,2)
    pq.enqueue(2,1)
    it("should add an element in priority queue", function() {
        assert.deepEqual(input, pq.items);
      });

    it("should return the front element of the priority queue", function() {
    assert.deepEqual(input[0], pq.front());
    });

    it("should return the rear element of the priority queue", function() {
        assert.deepEqual(input[input.length-1], pq.rear());
    });

  });

  describe("Priority Queue class dequeue", function() {
    let input =[]
    let pq = new PriorityQueue();
    
    input.push(new QElement(1,2))
    input.push(new QElement(2,1))
    pq.enqueue(1,2)
    pq.enqueue(2,1)
    let e = input.pop()

    it("should dequeue the first element from the priority queue", function() {
      assert.deepEqual(e, pq.dequeue());
    });

    it("should return the front element of the priority queue", function() {
        assert.deepEqual(input[0], pq.front());
        });
    
        it("should return the rear element of the priority queue", function() {
            assert.deepEqual(input[input.length-1], pq.rear());
        });


  });

