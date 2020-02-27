import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";
import { addStates } from "./stateFunctions";
import {getWeight, isConnected,two_opt} from '../functions/util';
import {kruskals} from './mstAlgorithms';
import { checkNoPath, getOtherEndPoint, getComponentsEdge, getDegree,isDegreeViolated } from "./dcmstAlgorithms";

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

// export function kruskalConstrained(graph, degree) {
//   try{
//   //Sort the edges
//   let nodes = graph.nodes
//   let states = [{ highlighted: [], tree: [], text:"",status: 0 }];
//   let degrees = {}
//   let arr = []; //a copy of highlighted
//   let t = []
//   let unsafeNodes = populateUnsafeNodes(graph.edges, degree)

//   for(let i= 0;i<nodes.length;i++){
//       degrees[nodes[i].id] = 0;
//   }

//   addStates(states, [], [], [],"", 1);
//   addStates(states, [], [], [],"", 2);

//   let edges = graph.edges.sort((a,b) => {return a.weight - b.weight;});
//   // Initialize graph that'll contain the MST
//   let MST = []
//   let uf = new UnionFind(nodes);
//   // Add all edges to the Queue:
//   for(let i =0;i<edges.length;i++){
//       arr = []
//       let u = edges[i].source;
//       let v = edges[i].target;

//       //if edges[i] in MST is not acyclic
//       if(unsafeNodes.indexOf(u) == -1 && unsafeNodes.indexOf(v) == -1){
//       //if edges[i] in MST is not acyclic
//       addStates(states, [], t, [],"", 3);
//       arr.push(edges[i]);
//       addStates(states, arr, t, [],"", 4);
//       addStates(states, arr, t, [],"", 5);
//       if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
//          MST.push(edges[i])
//          degrees[u] +=1;
//          degrees[v] +=1;
//          uf.union(u,v)
//          t.push(edges[i]);
//          addStates(states, [], t, [],"", 6);
//       }
//     }
//   }
//   arr = []
//   for(let i=0;i<unsafeNodes.length; i++){
//     addStates(states, [], t, [],"", 7);
//     let adjacents = graph.getAdjacentsOfNode(unsafeNodes[i]).sort((a,b) => {return a.weight - b.weight;});
//     addStates(states, [], t, [],"", 8);
//     for(let j =0;j<adjacents.length;j++){
//         arr = [];
//         addStates(states, [], t, [],"", 9);
//         let u = adjacents[j].source;
//         let v = adjacents[j].target;
//         arr.push(adjacents[j])
//         addStates(states, arr, t, [],"", 10);
//         if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
//           MST.push(adjacents[j])
//           degrees[u] +=1;
//           degrees[v] +=1;
//           uf.union(u,v)
//           t.push(adjacents[j]);
//           addStates(states, [], t, [],"", 11);
//        }
//     }
//   }
//   one_opt(MST, graph, degrees,degree,states)
//   //check if is a minimum spanning tree
//   if(MST.length != nodes.length-1){
//       throw ErrMessage.DCMST_NOT_FOUND
//   }
//   addStates(
//     states,
//     [],
//     states[states.length - 1].tree,
//     [],
//     "",
//     14
//   );

//   return states;
//   }
//   catch(error){
//     console.log(error.toString())
//       return error.toString();
//   }
// }

/**
 * Modified version of kruskal algorithm to find approximate solution for DCMSTP
 * @param {*} graph
 * @param {*} degree
 */
export function kruskalConstrained(graph, degree) {
  try {
    let DCMST = [];
    let totalDegree = new Map();
    let nodes = graph.nodes;
    let edges = graph.edges.slice();
    let degrees = {};
    let uf = new UnionFind(nodes);
    for (let i = 0; i < nodes.length; i++) {
      degrees[nodes[i].id] = 0;
    }
    
    let states = [{ highlighted: [], tree: [], text: "", status: 0 }];
    for (let i = 0; i < nodes.length; i++) {
      let adjacents = graph.getAdjacentsOfNode(nodes[i].id);
      if (!totalDegree.has(adjacents.length)) {
        totalDegree.set(adjacents.length, [nodes[i].id]);
      } else {
        let temp = totalDegree.get(adjacents.length);
        temp.push(nodes[i].id);
        totalDegree.set(adjacents.length, temp);
      }
    }

    let t = [];

    let nodeWithDegreeOne = totalDegree.get(1);
    if (nodeWithDegreeOne) {
      for (let j = 0; j < nodeWithDegreeOne.length; j++) {
        let degreeOne = graph.getAdjacentsOfNode(nodeWithDegreeOne[j])[0];
        DCMST.push(degreeOne);
        t.push(degreeOne);
        edges.splice(edges.indexOf(degreeOne), 1);
        uf.union(degreeOne.source, degreeOne.target);
        degrees[degreeOne.source] += 1;
        degrees[degreeOne.target] += 1;
      }
    }
    addStates(states, [], t, [], "", 1);

    let nodeWithDegreeTwo = totalDegree.get(2);
    if (nodeWithDegreeTwo) {
      for (let j = 0; j < nodeWithDegreeTwo.length; j++) {
        let hnode = [];
        hnode.push(nodeWithDegreeTwo[j]);
        addStates(states, [], t, hnode, "", 2);
        let adjacents = graph.getAdjacentsOfNode(nodeWithDegreeTwo[j]);
        let v = getOtherEndPoint(adjacents[0], nodeWithDegreeTwo[j]);
        let u = getOtherEndPoint(adjacents[1], nodeWithDegreeTwo[j]);
        hnode.push(v);
        hnode.push(u);

        addStates(states, adjacents, t, hnode, "", 3);
        addStates(states, adjacents, t, hnode, "", 4);
        if (checkNoPath(v, u, graph)) {
          DCMST = DCMST.concat(adjacents);
          uf.union(u, v);
          edges.splice(edges.indexOf(adjacents[0]), 1);
          edges.splice(edges.indexOf(adjacents[1]), 1);
          degrees[u] += 1;
          degrees[v] += 1;
          t = t.concat(adjacents);
          degrees[nodeWithDegreeTwo[j]] += 2;
          addStates(states, [], t, hnode, "", 5);
        }
      }
    }

    addStates(states, [], t, [], "", 6);
    edges = edges.sort((a, b) => a.weight - b.weight);
    for (let i = 0; i < edges.length; i++) {
      addStates(states, [], t, [], "", 7);
      let u = edges[i].source;
      let v = edges[i].target;
      addStates(states, [edges[i]], t, [], "", 8);
      addStates(states, [edges[i]], t, [], "", 9);
      if (
        !uf.connected(u, v) &&
        degrees[u] + 1 <= degree &&
        degrees[v] + 1 <= degree
      ) {
        DCMST.push(edges[i]);
        degrees[u] += 1;
        degrees[v] += 1;
        t.push(edges[i]);
        uf.union(u, v);
        addStates(states, [], t, [], "", 10);
        if (DCMST.length == nodes.length - 1) {
          two_opt(DCMST, graph, states);
          addStates(states, [], t, [], "", 13);
          return states;
        }
      }
    }

    two_opt(DCMST, graph, states);
    if (DCMST.length != nodes.length - 1) throw ErrMessage.DCMST_NOT_FOUND;
    addStates(states, [], t, [], "", 13);
    return states;
  } catch (e) {
    return e.toString();
  }
}

/**
 * Simulated Annealing gives approximate solution to the degree constrained minimum spanning tree
 * @param {*} graph
 * @param {*} degree
 */
export function simulatedAnnealing(graph, degree) {
  try {
    //Initial configuration MST
    let MST = kruskals(graph);
    if(MST== ErrMessage.MST_NOT_FOUND) throw ErrMessage.DCMST_NOT_FOUND
    let states = [{ highlighted: [], tree: [], text: "", status: 0 }];
    addStates(states, MST, [], [], "", 1);

    let degrees = getDegree(MST);
    let K_LEVEL = 0;
    let DCMST = [];
    let MAX_TEMP_LEVEL = 2000;
    let weight = Number.MAX_SAFE_INTEGER;
    while (K_LEVEL < MAX_TEMP_LEVEL) {
      addStates(states, MST, [], [], "", 2);
      let TEMP_RANGE = MAX_TEMP_LEVEL / K_LEVEL;
      //Delete a random edge from the current configuration
      let edgeIndex = Math.floor(Math.random() * MST.length);
      let edge = MST[edgeIndex];
      MST.splice(edgeIndex, 1);
      addStates(states, MST, [], [], "", 3);
      //Decrease the degree of the edge endpoints
      degrees[edge.source] -= 1;
      degrees[edge.target] -= 1;

      //Get the edges that connect the graph
      let connectingEdges = getComponentsEdge(graph, MST);

      //Get a random edge from the edges that connect the components and add to MST
      let newEdgeIndex = Math.floor(Math.random() * connectingEdges.length);
      let newEdge = connectingEdges[newEdgeIndex];
      MST.push(newEdge);
      addStates(states, MST, [], [], "", 4);
      //Increase the degree of the edge endpoints
      degrees[newEdge.source] += 1;
      degrees[newEdge.target] += 1;
      addStates(states, MST, [], [], "", 5);
      //Check if the degree is not violated and the graph is connected
      if (!isDegreeViolated(degrees, degree) && isConnected(graph.nodes, MST)) {
        let newWeight = getWeight(MST);
        //If the new weight is better than the old weight, update the DCMST and the weight
        if (newWeight < weight) {
          weight = getWeight(MST);
          DCMST = MST.slice();
          addStates(states, [], DCMST, [], "", 6);
        } else {
          // let prob = Math.E ** ((weight - newWeight)/TEMP_RANGE);
          // let realNum = [0,1][Math.floor(Math.random() * 2)];
          // if(prob >= realNum){
          //     weight = getWeight(MST)
          //     DCMST = MST.slice();
          // }
        }
      }
      addStates(states, MST, [], [], "", 7);
      K_LEVEL++;
    }
    if (DCMST.length != graph.nodes.length - 1)
      throw ErrMessage.DCMST_NOT_FOUND;
    addStates(states, [], DCMST, [], "", 8);
    return states;
  } catch (e) {
    console.log(e.toString())
    return e.toString();
  }
}
