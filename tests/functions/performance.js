import {comparePerformance, calculateTime} from "../../src/functions/performance";
import {Algorithm} from "../../src/constants/algorithms";
import {performance} from 'perf_hooks';
const assert = require('assert');

describe('compare performance of different algorithms on different input', function() {
    /**
 * Correct input: connected graph
 */
const input= {
    nodes: [{ id: 1, x: 20, y: 200 },
        { id: 2, x: 80, y: 100 },
        { id: 3, x: 200, y: 100 },
        { id: 4, x: 320, y: 100},
        { id: 5, x: 380, y: 200 },
        { id: 6, x: 320, y: 300},
        { id: 7, x: 200, y: 300 },
        { id: 8, x: 80, y: 300},
        { id: 9, x: 150, y: 200 },
    ],
    edges: [
        {source:1, target:2, weight:4, highlight:false},
        {source:2, target:3, weight:8,highlight:false},
        {source:3, target:4, weight:7,highlight:false},
        {source:4, target:5, weight:9,highlight:false},
        {source:5, target:6, weight:10,highlight:false},
        {source:6, target:3, weight:14,highlight:false},
        {source:6, target:7, weight:2,highlight:false},
        {source:4, target:6, weight:1,highlight:false},
        {source:7, target:8, weight:7,highlight:false},
        {source:7, target:9, weight:6,highlight:false},
        {source:8, target:9, weight:7,highlight:false},
        {source:8, target:1, weight:8,highlight:false},
        {source:2, target:8, weight:11,highlight:false},
        {source:9, target:3, weight:2,highlight:false},
    ],
    };

    it('should return a list of four elements of performances when list has all the algorithms', function() {
      assert.equal(4, comparePerformance([Algorithm.KRUSKAL, Algorithm.PRIM, Algorithm.BORUVKA, Algorithm.PARALLEL], input).length);
    });

    it('should return a list of three elements of performances when list has three algorithms', function() {
        assert.equal(3, comparePerformance([Algorithm.KRUSKAL, Algorithm.PRIM, Algorithm.PARALLEL], input).length);
      });

    it('should return a list of two elements of performances when list has two algorithms', function() {
    assert.equal(2, comparePerformance([Algorithm.KRUSKAL, Algorithm.PRIM], input).length);
    });

    it('should return a list of one elements of performances when list has one algorithms', function() {
    assert.equal(1, comparePerformance([Algorithm.KRUSKAL], input).length);
    });

    it('should return a list of zero elements of performances when list has no algorithm', function() {
        assert.equal(0, comparePerformance([], input).length);
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
    console.log(funcRes);
    it('should return a minimum spanning tree', function() {
      assert.equal(Math.round(result), Math.round(funcRes));
    });


});