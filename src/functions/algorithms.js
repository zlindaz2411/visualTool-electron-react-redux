import { UnionFind } from "../functions/lib/unionFind";
import { PriorityQueue } from "../functions/lib/priorityQueue";
import {ErrMessage} from'../constants/errorMessage'
// import * as Parallel from 'paralleljs'

/**
 * Kruskals algorithm
 * Get all the states that are each step of the algorithm
 * @param {*} edges
 * @param {*} nodes
 */
export function kruskals(nodes, edges) {
  try {
    let states = [{ highlighted: [], tree: [], status: 0 }];
    //Sort the edges
    edges = edges.sort((a, b) => {
      return a.weight - b.weight;
    });
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let check = new Set();
    states.push({ highlighted: [], tree: [], status: 1 });

    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for (let i = 0; i < edges.length; i++) {
      let arr = [states[states.length - 1].highlighted.slice()]; //a copy of highlighted
      let t = states[states.length - 1].tree.slice();
      if (arr.length == 0)
        states.push({ highlighted: [], tree: [], status: 2 });
      else
        states.push({ highlighted: arr.slice(), tree: t.slice(), status: 2 });
      let u = edges[i].source;
      let v = edges[i].target;

      arr.push(edges[i]);
      states.push({ highlighted: arr.slice(), tree: t.slice(), status: 3 });
      //if edges[i] in MST is not acyclic
      states.push({ highlighted: arr.slice(), tree: t.slice(), status: 4 });
      if (!uf.connected(u, v)) {
        MST.add(edges[i]);
        uf.union(u, v);
        check.add(u);
        check.add(v);
        t.push(edges[i]);
        states.push({ highlighted: arr.slice(), tree: t.slice(), status: 5 });
      } else {
        arr.pop();
        states.push({ highlighted: arr.slice(), tree: t.slice(), status: 6 });
      }
    }

    states.push({
      highlighted: states[states.length - 1].highlighted,
      tree: states[states.length - 1].tree,
      status: 7
    });

    if (check.size != nodes.length) {
        throw ErrMessage.MST_NOT_FOUND
    }
    return states;
  } catch (error) {
    return error.toString();
  }
}

/**
 * Prim's algorithm
 * Get all the states that are each step of the algorithm
 * @param {*} edges
 * @param {*} nodes
 */
export function prims(nodes, edges) {
  try {
    let states = [{ highlighted: [], tree: [], status: 0 }];
    // Initialize graph that'll contain the MST
    let MST = new Set();
    states.push({ highlighted: [], tree: [], status: 1 });
    // Select first node as starting node
    let s = nodes[0];
    // Create a Priority Queue and explored set
    let edgeQueue = new PriorityQueue();
    let explored = new Set();
    explored.add(s.id);
    let check = new Set();
    let uf = new UnionFind(nodes);

    // Add all edges from this starting node to the PQ taking weights as priority
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].source == s.id) {
        edgeQueue.enqueue([s.id, edges[i].target], edges[i].weight);
      }
      if (edges[i].target == s) {
        edgeQueue.enqueue([s.id, edges[i].source], edges[i].weight);
      }
    }

    states.push({ highlighted: [], tree: [], status: 2 });

    // Take the smallest edge and add that to the new graph
    while (!edgeQueue.isEmpty()) {
      // Continue removing edges till we get an edge with an unexplored node

      let arr = [states[states.length - 1].highlighted.slice()]; //a copy of highlighted
      let t = states[states.length - 1].tree.slice();
      if (arr.length == 0)
        states.push({ highlighted: [], tree: [], status: 3 });
      else
        states.push({ highlighted: arr.slice(), tree: t.slice(), status: 3 });

      let currentMinEdge = edgeQueue.dequeue();

      let u = currentMinEdge.element[0];
      let v = currentMinEdge.element[1];

      arr.push({ source: u, target: v });
      states.push({ highlighted: arr.slice(), tree: t.slice(), status: 4 });
      states.push({ highlighted: arr.slice(), tree: t.slice(), status: 5 });

      if (!explored.has(v)) {
        if (!uf.connected(u, v)) {
          explored.add(v);
          MST.add([u, v, currentMinEdge.priority]);
          check.add(u);
          check.add(v);
          uf.union(u, v);
          t.push({ source: u, target: v });
          states.push({ highlighted: arr.slice(), tree: t.slice(), status: 6 });
          let temp = arr.slice();
          for (let i = 0; i < edges.length; i++) {
            if (edges[i].source == v) {
              if (
                !explored.has(edges[i].target) &&
                !explored.has(edges[i].target)
              ) {
                edgeQueue.enqueue([v, edges[i].target], edges[i].weight);
                temp.push(edges[i]);
              }
            }
            if (edges[i].target == v) {
              if (
                !explored.has(edges[i].source) &&
                !explored.has(edges[i].source)
              ) {
                edgeQueue.enqueue([v, edges[i].source], edges[i].weight);
                temp.push(edges[i]);
              }
            }
          }
          states.push({
            highlighted: temp.slice(),
            tree: t.slice(),
            status: 7
          });
        } else {
          arr.pop();
          states.push({ highlighted: arr.slice(), tree: t.slice(), status: 8 });
        }
      } else {
        arr.pop();
        states.push({ highlighted: arr.slice(), tree: t.slice(), status: 8 });
      }
    }

    states.push({
      highlighted: states[states.length - 1].highlighted,
      tree: states[states.length - 1].tree,
      status: 9
    });
    if (check.size != nodes.length) {
        throw ErrMessage.MST_NOT_FOUND
    }
    return states;
  } catch (error) {
    return error.toString();
  }
}

/**
 * Boruvka's algorithm
 * Get all the states that are each step of the algorithm
 * @param {*} edges
 * @param {*} nodes
 */
export function boruvkas(nodes, edges) {
  let states = [
    {
      highlighted: [],
      tree: [],
      highlightedNodes: [],
      treeNodes: [],
      status: 0
    }
  ];
  states.push({
    highlighted: [],
    tree: [],
    highlightedNodes: [],
    treeNodes: [],
    status: 1
  });
  let subset = new UnionFind(nodes);
  let num = nodes.length;
  // Initialize graph that'll contain the MST
  let MST = new Set();
  let cheapest = [];
  while (num > 1) {
    let hedge = states[states.length - 1].highlighted.slice(); //a copy of highlighted
    let tedge = states[states.length - 1].tree.slice();
    let hnode = states[states.length - 1].highlightedNodes.slice(); //a copy of highlighted

    if (hedge.length == 0)
      states.push({ highlighted: [], tree: [], highlightedNodes: [] });
    else
      states.push({
        highlighted: hedge.slice(),
        tree: tedge.slice(),
        highlightedNodes: hnode.slice(),
        status: 3
      });

    for (let v = 0; v < nodes.length; v++) {
      cheapest[nodes[v].id] = -1;
    }

    for (let i = 0; i < edges.length; i++) {
      states.push({
        highlighted: hedge.slice(),
        tree: tedge.slice(),
        highlightedNodes: hnode.slice(),
        status: 4
      });

      let u = subset.find(edges[i].source);
      let v = subset.find(edges[i].target);
      let node = [];
      node.push(u);
      node.push(v);
      states.push({
        highlighted: hedge.slice(),
        tree: tedge.slice(),
        highlightedNodes: node.slice(),
        status: 5
      });

      if (u == v) {
        states.push({
          highlighted: hedge.slice(),
          tree: tedge.slice(),
          highlightedNodes: [],
          status: 5
        });
        continue;
      } else {
        hedge.push(edges[i]);
        states.push({
          highlighted: hedge.slice(),
          tree: tedge.slice(),
          highlightedNodes: hnode.slice(),
          status: 6
        });
        if (cheapest[u] == -1 || edges[i].weight < cheapest[u].weight) {
          hedge.pop();
          states.push({
            highlighted: hedge.slice(),
            tree: tedge.slice(),
            highlightedNodes: hnode.slice(),
            status: 7
          });
          cheapest[u] = edges[i];
        }
        hedge.push(edges[i]);
        states.push({
          highlighted: hedge.slice(),
          tree: tedge.slice(),
          highlightedNodes: hnode.slice(),
          status: 8
        });
        if (cheapest[v] == -1 || edges[i].weight < cheapest[v].weight) {
          hedge.pop();
          states.push({
            highlighted: hedge.slice(),
            tree: tedge.slice(),
            highlightedNodes: hnode.slice(),
            status: 9
          });
          cheapest[v] = edges[i];
        }
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      states.push({
        highlighted: hedge.slice(),
        tree: tedge.slice(),
        highlightedNodes: hnode.slice(),
        status: 10
      });
      let e = cheapest[nodes[i].id];
      states.push({
        highlighted: hedge.slice(),
        tree: tedge.slice(),
        highlightedNodes: hnode.slice(),
        status: 11
      });
      if (e != -1) {
        let u = subset.find(e.source);
        let v = subset.find(e.target);
        if (u == v) continue;
        hedge.push(e);
        states.push({
          highlighted: hedge.slice(),
          tree: tedge.slice(),
          highlightedNodes: hnode.slice(),
          status: 12
        });
        if (!subset.connected(u, v)) {
          MST.add(e);
          subset.union(u, v);
          tedge.push(e);
          states.push({
            highlighted: hedge.slice(),
            tree: tedge.slice(),
            highlightedNodes: hnode.slice(),
            status: 13
          });
          num--;
          states.push({
            highlighted: hedge.slice(),
            tree: tedge.slice(),
            highlightedNodes: hnode.slice(),
            status: 14
          });
        } else {
          hedge.pop();
          states.push({
            highlighted: hedge.slice(),
            tree: tedge.slice(),
            highlightedNodes: hnode.slice(),
            status: 15
          });
        }
      }
    }
  }
  states.push({
    highlighted: states[states.length - 1].highlighted,
    tree: states[states.length - 1].tree,
    highlightedNodes: states[states.length - 1].highlightedNodes,
    treeNodes: states[states.length - 1].treeNodes,
    status: 16
  });
  return states;
}

export function test() {
  // var p = new Parallel([1, 2, 3, 4, 5]);
  // console.log(p.data)
}

export function parallel(nodes, edges) {
  let subset = new UnionFind(nodes);
  let num = nodes.length;
  // Initialize graph that'll contain the MST
  let MST = new Set();
  let cheapest = [];
  while (num > 1) {
    for (let v = 0; v < nodes.length; v++) {
      cheapest[nodes[v]] = -1;
    }

    for (let i = 0; i < edges.length; i++) {
      let u = subset.find(edges[i].source);
      let v = subset.find(edges[i].target);
      if (u == v) continue;
      else {
        if (cheapest[u] == -1 || edges[i].weight < cheapest[u].weight)
          cheapest[u] = edges[i];
        if (cheapest[v] == -1 || edges[i].weight < cheapest[v].weight)
          cheapest[v] = edges[i];
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      let e = cheapest[nodes[i]];
      if (e != -1) {
        let u = subset.find(e.source);
        let v = subset.find(e.target);
        if (u == v) continue;
        if (!subset.connected(u, v)) {
          MST.add(cheapest[nodes[i]]);
          subset.union(u, v);
          num--;
        }
      }
    }
  }
  return MST;
}
