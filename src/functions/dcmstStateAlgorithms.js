import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";
import {addStates} from './stateFunctions';
import {getEdge, getWeight, populateUnsafeNodes, findIndex, getCommonEnd} from './dcmstAlgorithms';


/**
 * Kruskals Constrained degree algorithm
 * Get all the states that are each step of the algorithm
 * @param {*} edges
 * @param {*} nodes
 */
// export function kruskalConstrained(graph, degree) {
//   try {
//     let states = [{ highlighted: [], tree: [], text:"",status: 0 }];
//     //Sort the edges
//     let nodes = graph.nodes;
//     let edges = graph.edges.sort((a, b) => {
//       return a.weight - b.weight;
//     });
    
//     // Initialize graph that'll contain the MST
//     let MST = new Set();

//     let degrees = {}
    
//     for(let i= 0;i<nodes.length;i++){
//         degrees[nodes[i].id] = 0;
//     }
//     addStates(states, [], [], [],"", 1);

//     let uf = new UnionFind(nodes);
//     // Add all edges to the Queue:
//     for (let i = 0; i < edges.length; i++) {
//       let arr = []; //a copy of highlighted
//       let t = states[states.length - 1].tree.slice();

//       addStates(states, arr, t, [],"", 2);
//       let u = edges[i].source;
//       let v = edges[i].target;

//       arr.push(edges[i]);
//       addStates(states, arr, t, [],"", 3);
//       //if edges[i] in MST is not acyclic
//       addStates(states, arr, t, [],"", 4);
//       if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
//         MST.add(edges[i])
//         degrees[u] +=1;
//         degrees[v] +=1;
//         t.push(edges[i]);
//         addStates(states, arr, t, [], "",5);
//         uf.union(u,v)
//      } else {
//         arr.pop();
//         addStates(states, arr, t, [], "",6);
//       }
//     }
    
//     two_opt(MST,graph, states)
//     if (MST.size != nodes.length-1) {
//       throw ErrMessage.MST_NOT_FOUND;
//     }
//     return states;
//   } catch (error) {
//     return error.toString();
//   }
// }

export function kruskalConstrained(graph, degree) {
  try{
  //Sort the edges 
  let nodes = graph.nodes
  let states = [{ highlighted: [], tree: [], text:"",status: 0 }];
  let degrees = {}
  let arr = []; //a copy of highlighted
  let t = []
  unsafeNodes = populateUnsafeNodes(graph.edges)
  
  for(let i= 0;i<nodes.length;i++){
      degrees[nodes[i].id] = 0;
  }

  addStates(states, [], [], [],"", 1);
  addStates(states, [], [], [],"", 2);

  let edges = graph.edges.sort((a,b) => {return a.weight - b.weight;});
  // Initialize graph that'll contain the MST
  let MST = []
  let uf = new UnionFind(nodes);
  // Add all edges to the Queue:
  for(let i =0;i<edges.length;i++){
      arr = []
      let u = edges[i].source;
      let v = edges[i].target;

      //if edges[i] in MST is not acyclic
      if(unsafeNodes.indexOf(u) == -1 && unsafeNodes.indexOf(v) == -1){
      //if edges[i] in MST is not acyclic
      addStates(states, [], t, [],"", 3);
      arr.push(edges[i]);
      addStates(states, arr, t, [],"", 4);
      addStates(states, arr, t, [],"", 5);
      if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
         MST.push(edges[i])
         degrees[u] +=1;
         degrees[v] +=1;
         uf.union(u,v)
         t.push(edges[i]);
         addStates(states, [], t, [],"", 6);
      }
    }
  }
  arr = []
  for(let i=0;i<unsafeNodes.length; i++){
    addStates(states, [], t, [],"", 7);
    let adjacents = graph.getAdjacentsOfNode(unsafeNodes[i]).sort((a,b) => {return a.weight - b.weight;});
    addStates(states, [], t, [],"", 8);
    for(let j =0;j<adjacents.length;j++){
        arr = [];
        addStates(states, [], t, [],"", 9);
        let u = adjacents[j].source;
        let v = adjacents[j].target;
        arr.push(adjacents[j])
        addStates(states, arr, t, [],"", 10);
        if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
          MST.push(adjacents[j])
          degrees[u] +=1;
          degrees[v] +=1;
          uf.union(u,v)
          t.push(adjacents[j]);
          addStates(states, [], t, [],"", 11);
       }
    }
  }
  one_opt(MST, graph, degrees,degree,states)
  //check if is a minimum spanning tree
  if(MST.length != nodes.length-1){
      throw ErrMessage.MST_NOT_FOUND
  }
  addStates(
    states,
    [],
    states[states.length - 1].tree,
    [],
    "",
    14
  );
  
  return states;
  }
  catch(error){
      return error.toString();
  }
}

function one_opt(mst, originalGraph, degrees, degree, states){
  for(let i=0; i<mst.length; i++){
    let endPoints = getCommonEnd(mst[i],originalGraph.edges, originalGraph.nodes)
    for(let m =0;m<endPoints.length;m++){
      let first = endPoints[m][0]
      let second = endPoints[m][1]
      let firstIndex = findIndex(first, mst)
      let secondIndex = findIndex(second,mst)
      if(first && second){
     
      if(first.weight < second.weight){
        if(firstIndex== -1 && secondIndex != -1 ){
          mst.splice(secondIndex,1)
          degrees[second.source] -=1;
          degrees[second.target] -=1;
          if(degrees[first.source]+1<= degree && degrees[first.target]+1 <=degree){
            mst.push(first)
            degrees[first.source] +=1;
            degrees[first.target] +=1;
            addStates(states, [], mst, [], "", 13)
          }
          else{
            mst.push(second)
            degrees[second.source] +=1;
            degrees[second.target] +=1;
          }
        }
      }
      else if(second.weight < first.weight){
        if(secondIndex== -1 && firstIndex != -1 ){
          mst.splice(firstIndex,1)
          degrees[first.source] -=1;
          degrees[first.target] -=1;
          if(degrees[second.source]+1 <= degree && degrees[second.target]+1 <= degree){
            mst.push(second)
            degrees[second.source] +=1;
            degrees[second.target] +=1;
            addStates(states, [], mst, [], "", 13)
          }
          else{
            mst.push(first)
            degrees[first.source] +=1;
            degrees[first.target] +=1;
          }
      }
      }
      }
    }
}

return mst;
}



function two_opt(mst, originalGraph, states){
  let nodes = originalGraph.nodes
  let minWeight = getWeight(mst);
  while(true){
    addStates(states, [], states[states.length - 1].tree, [], "", 12)
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
                 addStates(states, [], mst, [], "", 13)
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


