import { Graph } from "../../src/functions/lib/graph";

const assert = require('assert');

describe("Graph class default constructor", function() {
  
  const graph = new Graph();


  it("should return true if empty node list", function() {
      assert.deepEqual([], graph.nodes);
    });

    it("should return true if empty edge list", function() {
    assert.deepEqual([], graph.edges);
    });
    it("should return 1 for the root", function() {
    assert.deepEqual(1, graph.root);
    });
    it("should return an empty map for the adjacent map", function() {
    assert.deepEqual({}, graph.adjacents);
    });

    let nodes= [{ id: 1, x: 20, y: 200 },
        { id: 2, x: 80, y: 100 },
        { id: 3, x: 200, y: 100 },
    ]
    let edges= [
        {source:1, target:2, weight:4, highlight:false},
        {source:2, target:3, weight:8,highlight:false},
        {source:3, target:1, weight:7,highlight:false}]

    let map = {
        1 : [edges[0], edges[2]],
        2: [edges[0], edges[1]],
        3: [edges[1], edges[2]]
    }

    const graph1 = new Graph(nodes[0], nodes, edges, map);
    it("should return true if the graph nodes have the correct values", function() {
        assert.deepEqual(nodes, graph1.nodes);
      });
  
      it("should return true if the graph edges have the correct values", function() {
      assert.deepEqual(edges, graph1.edges);
      });
      it("should return true if the graph root has the correct value", function() {
      assert.deepEqual(nodes[0], graph1.root);
      });
      it("should return true if the graph adjacents have the correct values", function() {
      assert.deepEqual(map, graph1.adjacents);
      });

});



describe("Add node; add edge; get adjacents functions ", function() {

        let nodes= [{ id: 1, x: 20, y: 200 },
            { id: 2, x: 80, y: 100 },
            { id: 3, x: 200, y: 100 },
        ]
        let edges= [
            {source:1, target:2, weight:4, highlight:false},
            {source:2, target:3, weight:8,highlight:false},
            {source:3, target:1, weight:7,highlight:false}]
    
    let map = {
        1 : [edges[0], edges[2]],
        2: [edges[0], edges[1]],
        3: [edges[1], edges[2]]
    }

    let graph = new Graph();
    graph.addNode({ id: 1, x: 20, y: 200 })
    graph.addNode({id: 2, x: 80, y: 100 })
    graph.addNode({ id: 3, x: 200, y: 100 })
    graph.addEdge({source:1, target:2, weight:4, highlight:false})
    graph.addEdge({source:2, target:3, weight:8,highlight:false})
    graph.addEdge({source:3, target:1, weight:7,highlight:false})
  
  
    it("should return true if the graph nodes are those that are added", function() {
    assert.deepEqual(nodes, graph.nodes);
    });

    it("should return true if the graph edges are those that are added", function() {
        assert.deepEqual(edges, graph.edges);
    });
    it("should return 1 for the root", function() {
        assert.deepEqual(1, graph.root);
    });
    it("should return true if the graph adjacents are correct", function() {
        assert.deepEqual(map, graph.adjacents);
    });
    
  });

  describe("Remove function of Graph class", function() {

    let nodes= [{ id: 1, x: 20, y: 200 },
        { id: 2, x: 80, y: 100 },
        { id: 3, x: 200, y: 100 },
    ]
    let edges= [
        {source:1, target:2, weight:4, highlight:false},
        {source:2, target:3, weight:8,highlight:false},
        {source:3, target:1, weight:7,highlight:false}]

    let map = {
        1 : [edges[0], edges[2]],
        2: [edges[0], edges[1]],
        3: [edges[1], edges[2]]
    }

    let graph = new Graph();
    graph.addNode({ id: 1, x: 20, y: 200 })
    graph.addNode({id: 2, x: 80, y: 100 })
    graph.addNode({ id: 3, x: 200, y: 100 })
    graph.addEdge({source:1, target:2, weight:4, highlight:false})
    graph.addEdge({source:2, target:3, weight:8,highlight:false})
    graph.addEdge({source:3, target:1, weight:7,highlight:false})

    //Remove node
    graph.removeNode(0)
    delete map[nodes[0].id]
    nodes = [{ id: 2, x: 80, y: 100 }, { id: 3, x: 200, y: 100 }]
    edges= [ {source:2, target:3, weight:8,highlight:false}]
    map[nodes[0].id]  = [{source:2, target:3, weight:8,highlight:false}]
    map[nodes[1].id]= [{source:2, target:3, weight:8,highlight:false}]
    
    it("should return true if the graph nodes have the correct value after remove operation", function() {
    assert.deepEqual(nodes, graph.nodes);
    });
    it("should return true if the graph edges have the correct values after remove operation", function() {
        assert.deepEqual(edges, graph.edges);
    });
    it("should return true if the adjacent map have the correct values after remove operation", function() {
        assert.deepEqual(map, graph.adjacents);
    });

    //Remove edge
    graph.removeEdge(0);
    edges = [];
    map[nodes[0].id] = []
    map[nodes[1].id]= []
    it("should return true the graph edges have the correct values after remove operation", function() {
        assert.deepEqual(edges, graph.edges);
    });
    it("should return true if the adjacent map have the correct values after remove operation", function() {
        assert.deepEqual(map, graph.adjacents);
    });

  });