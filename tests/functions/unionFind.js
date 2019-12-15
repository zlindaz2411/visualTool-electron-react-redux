import { UnionFind } from "../../src/functions/lib/unionFind";

const assert = require('assert');

describe("Union find class constructor", function() {
  const input= {
      nodes: [{ id: 1, x: 20, y: 200 },
          { id: 2, x: 80, y: 100 },
          { id: 3, x: 200, y: 100 },
      ],
      edges: [
          {source:1, target:2, weight:4, highlight:false},
          {source:2, target:3, weight:8,highlight:false},
          {source:3, target:1, weight:7,highlight:false},]
  };
  
  const uf = new UnionFind(input.nodes);

  const parent = {"1":1, '2':2, "3":3}

  it("should return the parent of the initial constructor", function() {
      assert.deepEqual(parent, uf.parent);
    });

});

describe("Union find class functions", function() {
    const input= {
        nodes: [{ id: 1, x: 20, y: 200 },
            { id: 2, x: 80, y: 100 },
            { id: 3, x: 200, y: 100 },
        ],
        edges: [
            {source:1, target:2, weight:4, highlight:false},
            {source:2, target:3, weight:8,highlight:false},
            {source:3, target:1, weight:7,highlight:false},]
    };
    
    const uf = new UnionFind(input.nodes);
    uf.union(input.nodes[0].id,input.nodes[2].id);
  

    it("should return the parent of input node", function() {
        assert.equal(uf.parent[input.nodes[0].id], uf.find(input.nodes[0].id));
      });

    it("should return false if two nodes are not connected", function() {
      assert.equal(false, uf.connected(input.nodes[0].id,input.nodes[1].id));
    });

    
    it("should return true after the union of two nodes", function() {
      assert.equal(true, uf.connected(input.nodes[0].id,input.nodes[2].id));
    });
  });