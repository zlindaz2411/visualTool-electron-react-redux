import {comparePerformanceByTime, comparePerformanceByWeight, calculateTime} from "../../src/functions/performance";
import {Algorithm} from "../../src/constants/algorithms";
import {performance} from 'perf_hooks';
import {Graph} from '../../src/functions/lib/graph';
const assert = require('assert');

let graph = new Graph();
graph.addNode({ id: 1, x: 20, y: 200, highlight: false });
graph.addNode( { id: 2, x: 80, y: 100, highlight: false });
graph.addNode( { id: 3, x: 200, y: 100, highlight: false });
graph.addNode({ id: 4, x: 320, y: 100, highlight: false });
graph.addNode({ id: 5, x: 380, y: 200, highlight: false });
graph.addNode({ id: 6, x: 320, y: 300, highlight: false });
graph.addNode( { id: 7, x: 200, y: 300, highlight: false });
graph.addNode({ id: 8, x: 80, y: 300, highlight: false });
graph.addNode( { id: 9, x: 150, y: 200, highlight: false });
graph.addEdge(  { source: 1, target: 2, weight: 3, highlight: false, tree: false });
graph.addEdge(  { source: 2, target: 3, weight: 5, highlight: false, tree: false });
graph.addEdge(  { source: 3, target: 4, weight: 4, highlight: false, tree: false });
graph.addEdge(  { source: 4, target: 5, weight: 8, highlight: false, tree: false });
graph.addEdge(  { source: 5, target: 6, weight: 10, highlight: false, tree: false });
graph.addEdge(  { source: 6, target: 3, weight: 11, highlight: false, tree: false });
graph.addEdge(  { source: 6, target: 7, weight: 13, highlight: false, tree: false });
graph.addEdge(  { source: 4, target: 6, weight: 1, highlight: false, tree: false });
graph.addEdge(  { source: 7, target: 8, weight: 2, highlight: false, tree: false });
graph.addEdge(  { source: 7, target: 9, weight: 9, highlight: false, tree: false });
graph.addEdge( { source: 8, target: 9, weight: 8, highlight: false, tree: false });
graph.addEdge( { source: 8, target: 1, weight: 7, highlight: false, tree: false });
graph.addEdge( { source: 2, target: 8, weight: 6, highlight: false, tree: false });
graph.addEdge(  { source: 9, target: 3, weight: 5, highlight: false, tree: false });


describe('compare performance of different algorithms on different input', function() {

    it('should return a list of four elements of performances when list has all the algorithms', function() {
      assert.equal(4, comparePerformanceByTime([Algorithm.KRUSKAL, Algorithm.PRIM, Algorithm.BORUVKA, Algorithm.PARALLEL], graph, 0,0).length);
    });

    it('should return a list of three elements of performances when list has three algorithms', function() {
        assert.equal(3, comparePerformanceByTime([Algorithm.KRUSKAL, Algorithm.PRIM, Algorithm.PARALLEL], graph, 0,0).length);
      });

    it('should return a list of two elements of performances when list has two algorithms', function() {
    assert.equal(2, comparePerformanceByTime([Algorithm.KRUSKAL, Algorithm.PRIM], graph, 0,0).length);
    });

    it('should return a list of one elements of performances when list has one algorithms', function() {
    assert.equal(1, comparePerformanceByTime([Algorithm.KRUSKAL], graph, 0, 0).length);
    });

    it('should return a list of zero elements of performances when list has no algorithm', function() {
        assert.equal(0, comparePerformanceByTime([], graph, 0, 0).length);
        });

});

describe('compare the weight computed by different algorithms ', function() {
    const res = [34,34,34,34,40,51]
    it('should return a list of four elements of performances when list has all the algorithms', function() {
      assert.deepEqual(res, comparePerformanceByWeight([Algorithm.KRUSKAL, Algorithm.PRIM, Algorithm.BORUVKA, Algorithm.PARALLEL, Algorithm.CONSTRAINED, Algorithm.ESAU], graph, 2, 3));
    });


});

describe('calculate time', function() {
    let startTime = performance.now();
    for(let i=0;i<10;i++){
        //do nothing
    }
    let endTime = performance.now();
    const result = endTime - startTime;
    const funcRes = calculateTime(function(){for(let i=0;i<10;i++){
        //do nothing
    }});
    it('should return a minimum spanning tree', function() {
      assert.equal(Math.round(result), Math.round(funcRes));
    });


});