import reducer from '../../src/reducers/drawReducer'
import { ADD_GRAPH, FETCH_GRAPHS, PASS_GRAPH} from "../../src/actions/types";


const assert = require('assert');

const input= {
    nodes: [{ id: 1, x: 20, y: 200 },
        { id: 2, x: 80, y: 100 },
        { id: 3, x: 200, y: 100 },
        { id: 4, x: 320, y: 100},
    ],
    edges: [
        {source:1, target:2, weight:4, highlight:false},
        {source:2, target:3, weight:8,highlight:false},
        {source:3, target:4, weight:7,highlight:false},
        {source:4, target:3, weight:9,highlight:false},
    ],
};



describe('add graph reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reducer(undefined, {}),
      {
        arr: [],
        latestGraph: null,
        error: null,
      }
    )
  })
  it('should handle ADD_GRAPH', () => {
    assert.deepEqual(reducer(undefined, {
        type:ADD_GRAPH,
    }),
      {
        arr: [],
        latestGraph: null,
        error: null,
      }
    )
  })
})



describe('fetch graphs reducer', () => {
    it('should return the initial state', () => {
      assert.deepEqual(reducer(undefined, {}),
        {
          arr: [],
          latestGraph: null,
          error:null,
        }
      )
    })
    it('should handle FETCH_GRAPHS', () => {
      assert.deepEqual(reducer(undefined, {
        type: FETCH_GRAPHS,
        payload: input
       }),
        {
          arr: input,
          latestGraph:null,
          error: null,
        }
      )
    })
  })

  describe('pass graph reducer', () => {
    it('should return the initial state', () => {
      assert.deepEqual(reducer(undefined, {}),
        {
          arr: [],
          latestGraph: null,
          error: null,
        }
      )
    })
    it('should handle PASS_GRAPH', () => {
      assert.deepEqual(reducer(undefined, {
        type: PASS_GRAPH,
        latestGraph: input
       }),
        {
          arr: [],
          latestGraph: input,
          error: null,
        }
      )
    })
  })
