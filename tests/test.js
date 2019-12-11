require("babel-register")

import {kruskals} from "../src/functions/algorithms";


const assert = require('assert');

describe('kruskal algorithm should return a state of all the steps of the algorithm', function() {
    const input= {
        nodes: [1,2,3],
        edges: [
            {source:1, target:2, weight:4, highlight:false},
            {source:2, target:3, weight:8,highlight:false},
            {source:3, target:4, weight:7,highlight:false},
            {source:4, target:1, weight:2,highlight:false},
        ],
    };

    
    it('should return -1 when the value is not present', function() {
      assert.equal(result, kruskals(input.nodes, input.edges));
    });
});