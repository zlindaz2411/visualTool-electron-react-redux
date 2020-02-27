import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";
import {getWeight, isConnected} from '../functions/util';
import {kruskals} from './mstAlgorithms';
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

/**
 * Modified version of kruskal algorithm to find approximate solution for DCMSTP
 * @param {*} graph 
 * @param {*} degree 
 */
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

  //Get the initial degree for each node
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


  //Add all the edges adjacents to node with degree 1 to the DCMST
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

  //Check the edges adjacents to node with degree 2. If there isn't a path between them apart from going though the considering node. Add to the DCMST
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

    //Classic Kruskal method
    edges = edges.sort((a, b) => a.weight - b.weight);
    for (let i = 0; i < edges.length; i++) {
      let u = edges[i].source;
      let v = edges[i].target;
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
  
  //Improve the solution using two-opt
  two_opt(DCMST, graph, null)
  if(DCMST.length != nodes.length-1) throw ErrMessage.DCMST_NOT_FOUND
    
  return DCMST;
}catch(e){
  return e.toString();
}
}

/**
 * Simulated Annealing gives approximate solution to the degree constrained minimum spanning tree
 * @param {*} graph 
 * @param {*} degree 
 */
export function simulatedAnnealing(graph, degree){
  try{
  //Initial configuration MST
  let MST = kruskals(graph)

  let degrees = getDegree(MST)
  let K_LEVEL = 0;
  let DCMST = [];
  let MAX_TEMP_LEVEL = 2000;
  let weight = Number.MAX_SAFE_INTEGER;
  let weights = [];
  while(K_LEVEL<MAX_TEMP_LEVEL){
      weights.push(weight)
      let TEMP_RANGE = MAX_TEMP_LEVEL/K_LEVEL
      if(weights>5){
          weights.shift();
      }
          //Delete a random edge from the current configuration
          let edgeIndex = Math.floor((Math.random() * MST.length))
          let edge = MST[edgeIndex]
          MST.splice(edgeIndex, 1)
          //Decrease the degree of the edge endpoints
          degrees[edge.source] -=1
          degrees[edge.target] -=1

          //Get the edges that connect the graph
          let connectingEdges = getComponentsEdge(graph, MST)

          //Get a random edge from the edges that connect the components and add to MST
          let newEdgeIndex = Math.floor((Math.random() * connectingEdges.length))
          let newEdge = connectingEdges[newEdgeIndex]
          MST.push(newEdge)
          //Increase the degree of the edge endpoints
          degrees[newEdge.source] +=1
          degrees[newEdge.target] +=1

          //Check if the degree is not violated and the graph is connected
          if(!isDegreeViolated(degrees, degree) && isConnected(graph.nodes, MST)){   
              let newWeight = getWeight(MST)
              //If the new weight is better than the old weight, update the DCMST and the weight
              if(newWeight< weight){
                  weight = getWeight(MST)
                  DCMST = MST.slice();
              }else{
                  // let prob = Math.E ** ((weight - newWeight)/TEMP_RANGE);
                  // let realNum = [0,1][Math.floor(Math.random() * 2)];    
                  // if(prob >= realNum){                      
                  //     weight = getWeight(MST)
                  //     DCMST = MST.slice();
                  // }
              }
          }
      if(weights.length == 5) if(checkConverged(weights)) break;
      K_LEVEL++;
  }
  if(DCMST.length != graph.nodes.length-1) throw ErrMessage.DCMST_NOT_FOUND
  return DCMST
}catch(e){
  return e.toString()
}
}

/**
 * Check if the weights are the same
 * @param {*} weights 
 */
export function checkConverged(weights){
  for(let i= 0;i<weights.length-1;i++){
      if(weights[i] != weights[i+1]) return false
  }
  return true;
}


/**
 * Get the degree of the graph
 * @param {*} edges 
 */
export function getDegree(edges){
  let map = {}
  for(let i =0;i<edges.length;i++){
    if(!map[edges[i].source]) map[edges[i].source] =1
    else if(map[edges[i].source]) map[edges[i].source]+=1
    if(!map[edges[i].target]) map[edges[i].target] =1
    else if(map[edges[i].target]) map[edges[i].target]+=1
  }
  return map
}

/**
 * Get all the possible edges that connect the graph
 * @param {*} graph 
 * @param {*} MST 
 */
export function getComponentsEdge(graph, MST){
  let edges = graph.edges
  let nodes = graph.nodes
  let candidates =[]
  for(let i =0;i<edges.length;i++){
      MST.push(edges[i])
      if(isConnected(nodes, MST)){
          candidates.push(edges[i])
      }
      MST.pop();
  }
  return candidates
}

/**
 * Check if degree is violated
 * @param {*} degrees 
 * @param {*} degree 
 */
export function isDegreeViolated(degrees, degree){
  for(const [key, value] of Object.entries(degrees)){
      if(value > degree){
          return true
      }
  }
  return false;
}

/**
 * Check if there isn't more than 1 one path from a source to a target node
 * @param {*} source 
 * @param {*} target 
 * @param {*} graph 
 */
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

/**
 * Two-opt 
 * @param {*} mst 
 * @param {*} originalGraph 
 * @param {*} states 
 */
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

/**
 * Return the edge that has the two nodes; else return null
 * @param {*} edges 
 * @param {*} source 
 * @param {*} target 
 */
export function getEdge(edges,source, target){
  for(let i=0;i<edges.length; i++){
    if(edges[i].source == source && edges[i].target == target) return edges[i]
    else if(edges[i].source == target && edges[i].target == source) return edges[i]
  }
  return null
}

/**
 * Get the other endpoint of the edge given one point
 * @param {*} edge 
 * @param {*} source 
 */
export function getOtherEndPoint(edge, source) {
  if(edge){
    if (edge.source == source) return edge.target;
    else return edge.source;
  }
}




