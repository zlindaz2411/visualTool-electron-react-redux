// import { ADD_GRAPH, FETCH_GRAPHS, SAVE_GRAPH, DELETE_GRAPH, PASS_GRAPH} from "../../src/actions/types";
// import {passGraph} from "../../src/actions/draw";

// const assert = require('assert');

// const input= {
//     nodes: [{ id: 1, x: 20, y: 200 },
//         { id: 2, x: 80, y: 100 },
//         { id: 3, x: 200, y: 100 },
//         { id: 4, x: 320, y: 100},
//         { id: 5, x: 380, y: 200 },
//         { id: 6, x: 320, y: 300},
//         { id: 7, x: 200, y: 300 },
//         { id: 8, x: 80, y: 300},
//         { id: 9, x: 150, y: 200 },
//     ],
//     edges: [
//         {source:1, target:2, weight:4, highlight:false},
//         {source:2, target:3, weight:8,highlight:false},
//         {source:3, target:4, weight:7,highlight:false},
//         {source:4, target:5, weight:9,highlight:false},
//         {source:5, target:6, weight:10,highlight:false},
//         {source:6, target:3, weight:14,highlight:false},
//         {source:6, target:7, weight:2,highlight:false},
//         {source:4, target:6, weight:1,highlight:false},
//         {source:7, target:8, weight:7,highlight:false},
//         {source:7, target:9, weight:6,highlight:false},
//         {source:8, target:9, weight:7,highlight:false},
//         {source:8, target:1, weight:8,highlight:false},
//         {source:2, target:8, weight:11,highlight:false},
//         {source:9, target:3, weight:2,highlight:false},
//     ],
// };

// describe('', () => {
//     function expectedAction(graph){
//         return dispatch => {
//             dispatch({
//                 type: PASS_GRAPH,
//                 latestGraph : graph,
//         })
//     }
//     }

//     it('should return a minimum spanning tree', function() {
//               assert.deepEqual(expectedAction(input), passGraph(input));
//     });
// })
