import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";
import {addStates} from './stateFunctions';


/**
 * Kruskals Constrained degree algorithm
 * Get all the states that are each step of the algorithm
 * @param {*} edges
 * @param {*} nodes
 */
export function kruskalConstrained(graph, degree) {
  try {
    let states = [{ highlighted: [], tree: [], status: 0 }];
    //Sort the edges
    let nodes = graph.nodes;
    let edges = graph.edges.sort((a, b) => {
      return a.weight - b.weight;
    });
    
    // Initialize graph that'll contain the MST
    let MST = new Set();

    let degrees = {}
    
    for(let i= 0;i<nodes.length;i++){
        degrees[nodes[i].id] = 0;
    }
    addStates(states, [], [], [], 1);

    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for (let i = 0; i < edges.length; i++) {
      let arr = []; //a copy of highlighted
      let t = states[states.length - 1].tree.slice();

      addStates(states, arr, t, [], 2);
      let u = edges[i].source;
      let v = edges[i].target;

      arr.push(edges[i]);
      addStates(states, arr, t, [], 3);
      //if edges[i] in MST is not acyclic
      addStates(states, arr, t, [], 4);
      if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
        MST.add(edges[i])
        degrees[u] +=1;
        degrees[v] +=1;
        t.push(edges[i]);
        addStates(states, arr, t, [], 5);
        uf.union(u,v)
     } else {
        arr.pop();
        addStates(states, arr, t, [], 6);
      }
    }

    addStates(
      states,
      states[states.length - 1].highlighted,
      states[states.length - 1].tree,
      [],
      7
    );

    if (MST.size != nodes.length-1) {
      throw ErrMessage.MST_NOT_FOUND;
    }
    return states;
  } catch (error) {
    return error.toString();
  }
}
