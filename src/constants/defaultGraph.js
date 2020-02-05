import {Graph} from '../functions/lib/graph'

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
  

/**
 * Example of graph
 */
export let data = graph;



/**
 * Empty graph data
 */
export let emptyGraph = new Graph();

/**
 * Reset graph data to be empty again
 */
export function resetEmptyGraph() {
  emptyGraph = new Graph();
}
