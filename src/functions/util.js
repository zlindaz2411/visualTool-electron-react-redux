import { addStates } from "./stateFunctions";
/**
 * Get the sum of the weights of a path
 * @param {*} path
 */
export function getWeight(path) {
  let weight = 0;
  for (let i = 0; i < path.length; i++) {
    weight += path[i].weight;
  }
  return weight;
}

/**
 * Breadth first search to check if all the nodes of the graph are connected
 * @param {*} nodes
 * @param {*} edges
 */
export function isConnected(nodes, edges) {
  let queue = [nodes[0].id];
  let visited = {};
  for (let i = 0; i < nodes.length; i++) {
    visited[nodes[i].id] = false;
  }
  while (queue.length != 0) {
    let u = queue.shift();
    if (!visited[u]) {
      visited[u] = true;
      let adjacents = findAdjancentsVertices(u, edges);
      for (let j = 0; j < adjacents.length; j++) {
        if (!visited[adjacents[j]]) queue.push(adjacents[j]);
      }
    }
  }
  for (const [key, value] of Object.entries(visited)) {
    if (!value) return false;
  }
  return true;
}

/**
 * Find vertices of the adjacents edges to a node
 * @param {*} node
 * @param {*} edges
 */
function findAdjancentsVertices(node, edges) {
  let adjacents = new Set();
  for (let i = 0; i < edges.length; i++) {
    if (edges[i].source == node) {
      adjacents.add(edges[i].target);
    }
    if (edges[i].target == node) {
      adjacents.add(edges[i].source);
    }
  }
  return Array.from(adjacents);
}

/**
 * Two-opt
 * @param {*} mst
 * @param {*} originalGraph
 * @param {*} states
 */
export function two_opt(mst, originalGraph, states) {
  let nodes = originalGraph.nodes;
  let times = 0;
  let minWeight = getWeight(mst);
  while (true) {
    if (states)
      addStates(states, [], states[states.length - 1].tree, [], "", 11);
    let startWeight = minWeight;
    for (let i = 1; i < nodes.length; i++) {
      for (let j = i + 2; j < nodes.length; j++) {
        let oldEdge1 = getEdge(mst, nodes[i - 1].id, nodes[i].id);
        let oldEdge2 = getEdge(mst, nodes[j - 1].id, nodes[j].id);
        if (oldEdge1 && oldEdge2) {
          let newEdge1 = getEdge(
            originalGraph.edges,
            oldEdge1.source,
            oldEdge2.source
          );
          let newEdge2 = getEdge(
            originalGraph.edges,
            oldEdge1.target,
            oldEdge2.target
          );
          if (newEdge1 && newEdge2) {
            if (
              newEdge1.weight + newEdge2.weight <
              oldEdge1.weight + oldEdge2.weight
            ) {
              mst.splice(mst.indexOf(oldEdge1), 1);
              mst.splice(mst.indexOf(oldEdge2), 1);
              mst.push(newEdge1);
              mst.push(newEdge2);
              minWeight = getWeight(mst);
              times++;
              if (states)
                addStates(states, [], mst, [], "2-opt * " + times, 12);
            }
          }
        }
      }
    }
    if (startWeight == minWeight) {
      break;
    }
  }

  return times;
}

/**
 * Return the edge that has the two nodes; else return null
 * @param {*} edges
 * @param {*} source
 * @param {*} target
 */
export function getEdge(edges, source, target) {
  for (let i = 0; i < edges.length; i++) {
    if (edges[i].source == source && edges[i].target == target) return edges[i];
    else if (edges[i].source == target && edges[i].target == source)
      return edges[i];
  }
  return null;
}
