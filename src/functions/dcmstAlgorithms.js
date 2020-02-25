import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";
import {getWeight} from '../functions/util';
import {addStates} from './stateFunctions';


// /**
//  * Kruskals algorithm + 2 opt algorithm for computing DCMST
//  * @param {*} edges
//  * @param {*} nodes
//  */
// export function kruskalConstrained(graph, degree) {
//   try {
//     //Sort the edges
//     let nodes = graph.nodes;
//     let edges = graph.edges.sort((a, b) => {
//       return a.weight - b.weight;
//     });
    
//     // Initialize graph that'll contain the DCMST
//     let DCMST = new Set();

//     let degrees = {}
    
//     for(let i= 0;i<nodes.length;i++){
//         degrees[nodes[i].id] = 0;
//     }
//     let uf = new UnionFind(nodes);
//     // Add all edges to the Queue:
//     for (let i = 0; i < edges.length; i++) {
//       let u = edges[i].source;
//       let v = edges[i].target;


//       //if edges[i] in MST is not acyclic
//       if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
//         DCMST.add(edges[i])
//         degrees[u] +=1;
//         degrees[v] +=1;
//         uf.union(u,v)
//      }
//     }

//     if (DCMST.size != nodes.length-1) {
//       throw ErrMessage.DCMST_NOT_FOUND;
//     }
//     return states;
//   } catch (error) {
//     return error.toString();
//   }
// }

// export function kruskalConstrained(graph, degree) {
//   try{
//   //Sort the edges 
//   let nodes = graph.nodes
//   let degrees = {}
//   let unsafeNodes = populateUnsafeNodes(graph.edges, degree)
  
//   for(let i= 0;i<nodes.length;i++){
//       degrees[nodes[i].id] = 0;
//   }

//   let edges = graph.edges.sort((a,b) => {return a.weight - b.weight;});
//   // Initialize graph that'll contain the MST
//   let MST = []
//   let uf = new UnionFind(nodes);
//   // Add all edges to the Queue:
//   for(let i =0;i<edges.length;i++){
//       let u = edges[i].source;
//       let v = edges[i].target;
//       if(unsafeNodes.indexOf(u) == -1 && unsafeNodes.indexOf(v) == -1){
//       //if edges[i] in MST is not acyclic
//       if(!uf.connected(u,v) && degrees[u] +1 <= degree && degrees[v]+1 <= degree){
//          MST.push(edges[i])
//          degrees[u] +=1;
//          degrees[v] +=1;
//          uf.union(u,v)
//       }
//     }
//   }
  
//   for(let i=0;i<unsafeNodes.length; i++){
//     let adjacents = graph.getAdjacentsOfNode(unsafeNodes[i]).sort((a,b) => {return a.weight - b.weight;});
    
//     for(let j =0;j<adjacents.length;j++){
//         let u = adjacents[j].source;
//         let v = adjacents[j].target;
//         if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
//           MST.push(adjacents[j])
//           degrees[u] +=1;
//           degrees[v] +=1;
//           uf.union(u,v)
//        }
//     }
//   }
//   two_opt(MST,graph)
//   //check if is a minimum spanning tree
//   if(MST.length != nodes.length-1){
//       throw ErrMessage.DCMST_NOT_FOUND
//   }
//   return MST;
//   }
//   catch(error){
//       return error.toString();
//   }
// }

export function kruskalConstrained(graph, degree) {
  try{
  let DCMST = [];
  let totalDegree = new Map();
  let nodes = graph.nodes;
  let edges = graph.edges.slice();
  let possibleDegrees = [];
  let degrees = {};
  let uf = new UnionFind(nodes);
  for (let i = 0; i < nodes.length; i++) {
    degrees[nodes[i].id] = 0;
  }

  for (let i = 0; i < nodes.length; i++) {
    let adjacents = graph.getAdjacentsOfNode(nodes[i].id);
    if (!totalDegree.has(adjacents.length)) {
      totalDegree.set(adjacents.length, [nodes[i].id]);
    } else {
      let temp = totalDegree.get(adjacents.length);
      temp.push(nodes[i].id);
      totalDegree.set(adjacents.length, temp);
    }
    if (possibleDegrees.indexOf(adjacents.length) == -1)
      possibleDegrees.push(adjacents.length);
  }

  let nodeWithDegreeTwo = totalDegree.get(2);
  if(nodeWithDegreeTwo){
  for (let j = 0; j < nodeWithDegreeTwo.length; j++) {
    let adjacents = graph.getAdjacentsOfNode(nodeWithDegreeTwo[j]);
    let v = getOtherEndPoint(adjacents[0], nodeWithDegreeTwo[j]);
    let u = getOtherEndPoint(adjacents[1], nodeWithDegreeTwo[j]);
    if (checkNoPath(v, u, graph)) {
      DCMST = DCMST.concat(adjacents);
      uf.union(u, v);
      edges.splice(edges.indexOf(adjacents[0]), 1);
      edges.splice(edges.indexOf(adjacents[1]), 1);
      degrees[u] += 1;
      degrees[v] += 1;
      degrees[nodeWithDegreeTwo[j]] += 2;
      }
    }
  }
  
  let nodeWithDegreeOne = totalDegree.get(1);
  if(nodeWithDegreeOne){
  for (let j = 0; j < nodeWithDegreeOne.length; j++) {
    let degreeOne = graph.getAdjacentsOfNode(nodeWithDegreeOne[j])[0];
    DCMST.push(degreeOne);
    edges.splice(edges.indexOf(degreeOne), 1);
    uf.union(degreeOne.source, degreeOne.target);
    degrees[degreeOne.source] += 1;
    degrees[degreeOne.target] += 1;
    
  }
  }

    edges = edges.sort((a, b) => a.weight - b.weight);
    for (let i = 0; i < edges.length; i++) {
      let u = edges[i].source;
      let v = edges[i].target;
      // console.log(u + " s "+ v + " " + (!uf.connected(u,v)))
      if (
        !uf.connected(u, v) &&
        degrees[u] + 1 <= degree &&
        degrees[v] + 1 <= degree
      ) {
        DCMST.push(edges[i]);
        degrees[u] += 1;
        degrees[v] += 1;

        uf.union(u, v);
        if (DCMST.length == nodes.length - 1) {
          two_opt(DCMST, graph, null)
          return DCMST;
        }
      }
    }
  
  two_opt(DCMST, graph, null)
  if(DCMST.length != nodes.length-1) throw ErrMessage.DCMST_NOT_FOUND
    
  return DCMST;
}catch(e){
  return e.toString();
}
}

export function checkNoPath(source, target, graph) {
  let queue = [];
  let visited = {};
  let path = 0;

  for (let i = 0; i < graph.nodes.length; i++) {
    visited[graph.nodes[i].id] = false;
  }

  queue.push(source);
  while (queue.length != 0) {
    let u = queue.shift();
    if (u == target) {
      path++;
      if (path >= 2) {
        return false;
      }
      continue;
    }
    visited[u] = true;
    let adjacents = graph.getAdjacentsOfNode(u);
    if(adjacents.length !=0)
    for (let i = 0; i < adjacents.length; i++) {
      let v = getOtherEndPoint(adjacents[i], u);
      if (!visited[v]) {
        queue.push(v);
      }
    }
  }
  return true;
}

export function two_opt(mst, originalGraph, states){
  let nodes = originalGraph.nodes
  let minWeight = getWeight(mst);
  while(true){
    if(states) addStates(states, [], states[states.length - 1].tree, [], "", 11)
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
                 if(states) addStates(states, [], mst, [], "", 12)
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

export function getEdge(edges,source, target){
  for(let i=0;i<edges.length; i++){
    if(edges[i].source == source && edges[i].target == target) return edges[i]
    else if(edges[i].source == target && edges[i].target == source) return edges[i]
  }
  return null
}

export function getOtherEndPoint(edge, source) {
  if(edge){
    if (edge.source == source) return edge.target;
    else return edge.source;
  }
}




