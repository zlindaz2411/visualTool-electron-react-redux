/**
 * Example of graph
 */
export let data = {
  root: 1,
  nodes: [
    { id: 1, x: 20, y: 200, highlight: false },
    { id: 2, x: 80, y: 100, highlight: false },
    { id: 3, x: 200, y: 100, highlight: false },
    { id: 4, x: 320, y: 100, highlight: false },
    { id: 5, x: 380, y: 200, highlight: false },
    { id: 6, x: 320, y: 300, highlight: false },
    { id: 7, x: 200, y: 300, highlight: false },
    { id: 8, x: 80, y: 300, highlight: false },
    { id: 9, x: 150, y: 200, highlight: false }
    // {id:10, x:10, y:100, highlight:false},
  ],

  edges: [
    { source: 1, target: 2, weight: 4, highlight: false, tree: false },
    { source: 2, target: 3, weight: 8, highlight: false, tree: false },
    { source: 3, target: 4, weight: 7, highlight: false, tree: false },
    { source: 4, target: 5, weight: 9, highlight: false, tree: false },
    { source: 5, target: 6, weight: 10, highlight: false, tree: false },
    { source: 6, target: 3, weight: 14, highlight: false, tree: false },
    { source: 6, target: 7, weight: 2, highlight: false, tree: false },
    { source: 4, target: 6, weight: 1, highlight: false, tree: false },
    { source: 7, target: 8, weight: 7, highlight: false, tree: false },
    { source: 7, target: 9, weight: 6, highlight: false, tree: false },
    { source: 8, target: 9, weight: 7, highlight: false, tree: false },
    { source: 8, target: 1, weight: 8, highlight: false, tree: false },
    { source: 2, target: 8, weight: 11, highlight: false, tree: false },
    { source: 9, target: 3, weight: 2, highlight: false, tree: false }
  ]
};

/**
 * Empty graph data
 */
export let emptyGraph = {
  root: {}, 
  nodes: [],
  edges: []
};

/**
 * Reset graph data to be empty again
 */
export function resetEmptyGraph() {
  emptyGraph = {
    nodes: [],
    edges: []
  };
}
