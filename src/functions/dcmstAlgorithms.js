import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";
import { getWeight, isConnected, two_opt } from "../functions/util";
import { kruskals } from "./mstAlgorithms";

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
    if (nodeWithDegreeOne) {
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
    if (nodeWithDegreeTwo) {
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

    //Classic Kruskal method with degree constrained
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
          two_opt(DCMST, graph, null);
          return DCMST;
        }
      }
    }

    //Improve the solution using two-opt
    two_opt(DCMST, graph, null);
    if (DCMST.length != nodes.length - 1) throw ErrMessage.DCMST_NOT_FOUND;

    return DCMST;
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
    let MST = kruskals(graph);
    if(MST== ErrMessage.MST_NOT_FOUND) throw ErrMessage.DCMST_NOT_FOUND
    let K_LEVEL = 0;
    let DCMST = [];
    let alpha = 0.9;
    let TEMP_RANGE = 5000;
    let MAX_TEMP_LEVEL = 1000;
    let weight = Number.MAX_SAFE_INTEGER;
    let time =0 ;
    let prev = 0;
    while (K_LEVEL < MAX_TEMP_LEVEL) {
      prev = weight;
      TEMP_RANGE *= alpha;
      let edgeIndex = Math.floor(Math.random() * MST.length);
      let edge = MST[edgeIndex];
      MST.splice(edgeIndex, 1);
      let connectingEdges = getComponentsEdge(graph, MST);
      let newEdgeIndex = Math.floor(Math.random() * connectingEdges.length);
      let newEdge = connectingEdges[newEdgeIndex];
      MST.push(newEdge);

      if (
        !isDegreeViolated(getDegree(MST), degree)
      ) {
        let newWeight = getWeight(MST);
        let acceptanceProb = newWeight - weight;
        if (acceptanceProb < 0) {
          //  console.log(degrees)
          weight = getWeight(MST);
          DCMST = MST.slice();
        } else {
          let prob = Math.E ** (-acceptanceProb / TEMP_RANGE);
          let realNum = [0, 1][Math.floor(Math.random() * 2)];
          if (prob > realNum) {
            weight = getWeight(MST);
            DCMST = MST.slice();
          }
        }
      }
    
      if(prev != weight && time <300){
        time = 0;
    }
    if(time>=300){
      return DCMST
    }
    K_LEVEL++;
    time++;
    }

    return DCMST;
  } catch (e) {
    return e.toString();
  }
}

/**
 * Check if the weights are the same
 * @param {*} weights
 */
export function checkConverged(weights) {
  for (let i = 0; i < weights.length - 1; i++) {
    if (weights[i] != weights[i + 1]) return false;
  }
  return true;
}

/**
 * Get the degree of the graph
 * @param {*} edges
 */
export function getDegree(edges) {
  let map = {};
  for (let i = 0; i < edges.length; i++) {
    if (!map[edges[i].source]) map[edges[i].source] = 1;
    else if (map[edges[i].source]) map[edges[i].source] += 1;
    if (!map[edges[i].target]) map[edges[i].target] = 1;
    else if (map[edges[i].target]) map[edges[i].target] += 1;
  }
  return map;
}

/**
 * Get all the possible edges that connect the graph
 * @param {*} graph
 * @param {*} MST
 */
export function getComponentsEdge(graph, MST) {
  let edges = graph.edges;
  let nodes = graph.nodes;
  let candidates = [];
  for (let i = 0; i < edges.length; i++) {
    MST.push(edges[i]);
    if (isConnected(nodes, MST)) {
      candidates.push(edges[i]);
    }
    MST.pop();
  }
  return candidates;
}

/**
 * Check if degree is violated
 * @param {*} degrees
 * @param {*} degree
 */
export function isDegreeViolated(degrees, degree) {
  for (const [key, value] of Object.entries(degrees)) {
    if (value > degree) {
      return true;
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
    if (adjacents.length != 0)
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
 * Get the other endpoint of the edge given one point
 * @param {*} edge
 * @param {*} source
 */
export function getOtherEndPoint(edge, source) {
  if (edge) {
    if (edge.source == source) return edge.target;
    else return edge.source;
  }
}
