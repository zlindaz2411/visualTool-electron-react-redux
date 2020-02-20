import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";
import {addStates} from './stateFunctions';
import {getEdge, getWeight} from './dcmstAlgorithms';


/**
 * Kruskals Constrained degree algorithm
 * Get all the states that are each step of the algorithm
 * @param {*} edges
 * @param {*} nodes
 */
export function kruskalConstrained(graph, degree) {
  try {
    let states = [{ highlighted: [], tree: [], text:"",status: 0 }];
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
    addStates(states, [], [], [],"", 1);

    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for (let i = 0; i < edges.length; i++) {
      let arr = []; //a copy of highlighted
      let t = states[states.length - 1].tree.slice();

      addStates(states, arr, t, [],"", 2);
      let u = edges[i].source;
      let v = edges[i].target;

      arr.push(edges[i]);
      addStates(states, arr, t, [],"", 3);
      //if edges[i] in MST is not acyclic
      addStates(states, arr, t, [],"", 4);
      if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
        MST.add(edges[i])
        degrees[u] +=1;
        degrees[v] +=1;
        t.push(edges[i]);
        addStates(states, arr, t, [], "",5);
        uf.union(u,v)
     } else {
        arr.pop();
        addStates(states, arr, t, [], "",6);
      }
    }
    
    two_opt(MST,graph, states)

    addStates(
      states,
      states[states.length - 1].highlighted,
      states[states.length - 1].tree,
      [],
      "",
      9
    );

    if (MST.size != nodes.length-1) {
      throw ErrMessage.MST_NOT_FOUND;
    }
    return states;
  } catch (error) {
    return error.toString();
  }
}

function two_opt(mst, originalGraph, states){
  
  let nodes = originalGraph.nodes
  let minWeight = getWeight(mst);
  while(true){
    addStates(states, [], states[states.length - 1].tree, [], "", 7)
    let startWeight = minWeight
    for(let i=1; i<nodes.length; i++){
      for(let j=i+2; j<nodes.length; j++){
        let oldEdge1 = getEdge(mst, nodes[i-1].id, nodes[i].id)
        let oldEdge2 = getEdge(mst, nodes[j-1].id, nodes[j].id)
          if(oldEdge1 && oldEdge2){      
            let newEdge1 =getEdge(originalGraph.edges, oldEdge1.source, oldEdge2.source)
            let newEdge2 =getEdge(originalGraph.edges, oldEdge1.target, oldEdge2.target)
            if(newEdge1 && newEdge2){
              if(newEdge1.weight + newEdge2.weight < oldEdge1.weight + oldEdge2.weight){
                 mst.splice(mst.indexOf(oldEdge1),1)
                 mst.splice(mst.indexOf(oldEdge2),1)            
                 mst.push(newEdge1)
                 mst.push(newEdge2)
                 minWeight = getWeight(mst)
                 addStates(states, [], mst, [], "", 8)
              }
            }
          }
      }
    }
    if(startWeight == minWeight){
      break;
    }
  }
  
  return mst;
}


