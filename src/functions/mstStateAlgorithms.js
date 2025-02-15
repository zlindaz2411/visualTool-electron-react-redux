import { UnionFind } from "./lib/unionFind";
import { PriorityQueueHeap } from "./lib/priorityQueue";
import { ErrMessage } from "../constants/errorMessage";
import { addStates } from "./stateFunctions";

/**
 * Kruskals algorithm
 * Get all the states that are each step of the algorithm
 * @param {*} edges
 * @param {*} nodes
 */
export function kruskals(graph) {
  try {
    let states = [{ highlighted: [], tree: [], text: "", status: 0 }];
    //Sort the edges
    let nodes = graph.nodes;
    let edges = graph.edges.sort((a, b) => {
      return a.weight - b.weight;
    });
    // Initialize graph that'll contain the MST
    let MST = [];
    addStates(states, [], [], [], "", 1);

    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for (let i = 0; i < edges.length; i++) {
      let arr = []; //a copy of highlighted
      let t = states[states.length - 1].tree.slice();

      addStates(states, arr, t, [], "", 2);
      let u = edges[i].source;
      let v = edges[i].target;

      arr.push(edges[i]);
      addStates(states, arr, t, [], "", 3);
      //if edges[i] in MST is not acyclic
      addStates(states, arr, t, [], "", 4);
      if (!uf.connected(u, v)) {
        MST.push(edges[i]);
        uf.union(u, v);
        t.push(edges[i]);
        addStates(states, arr, t, [], "", 5);
        if (MST.length == nodes.length - 1) {
          addStates(
            states,
            [],
            states[states.length - 1].tree,
            [],
            "Total edges considered: " + (i + 1) + "/" + edges.length,
            7
          );
          return states;
        }
      } else {
        arr.pop();
        addStates(states, [], t, [], "", 6);
      }
    }

    addStates(
      states,
      [],
      states[states.length - 1].tree,
      [],
      "Total edges considered: " + edges.length + "/" + edges.length,
      7
    );

    if (MST.length != nodes.length - 1) {
      throw ErrMessage.MST_NOT_FOUND;
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
export function prims(graph) {
  try {
    let states = [{ highlighted: [], tree: [], text: "", status: 0 }];
    // Initialize graph that'll contain the MST
    let MST = [];
    addStates(states, [], [], [], "", 1);
    // Select first node as starting node
    let s = graph.root;
    let nodes = graph.nodes;
    // Create a Priority Queue and explored set
    let edgeQueue = new PriorityQueueHeap();
    let explored = new Set();
    explored.add(s.id);
    // Add all edges from this starting node to the PQ taking weights as priority
    let adjacents = graph.getAdjacentsOfNode(s.id);
    for (let i = 0; i < adjacents.length; i++) {
      if (adjacents[i].source != s.id)
        edgeQueue.insert([s.id, adjacents[i].source], adjacents[i].weight);
      if (adjacents[i].target != s.id)
        edgeQueue.insert([s.id, adjacents[i].target], adjacents[i].weight);
    }

    addStates(states, [], [], [], "", 2);
    let dequeueTimes = 0;

    // Take the smallest edge and add that to the new graph
    while (!edgeQueue.isEmpty()) {
      // Continue removing edges till we get an edge with an unexplored node

      let arr = []; //a copy of highlighted
      let t = states[states.length - 1].tree.slice();

      addStates(states, arr, t, [], "", 3);

      let currentMinEdge = edgeQueue.extractMin();
      dequeueTimes++;

      let u = currentMinEdge.element[0];
      let v = currentMinEdge.element[1];

      arr.push({ source: u, target: v });
      addStates(states, arr, t, [], "", 4);
      addStates(states, arr, t, [], "", 5);

      if (!explored.has(v)) {
        explored.add(v);
        MST.push([u, v, currentMinEdge.priority]);
        t.push({ source: u, target: v });
        if (MST.length == nodes.length - 1) {
          addStates(
            states,
            [],
            t,
            [],
            "Total edges dequeued: " + dequeueTimes + "/" + graph.edges.length,
            9
          );
          return states;
        }

        addStates(states, [], t, [], "", 6);
        let temp = arr.slice();
        let adjacents = graph.getAdjacentsOfNode(v);
        for (let i = 0; i < adjacents.length; i++) {
          if (adjacents[i].source != v) {
            if (!explored.has(adjacents[i].source)) {
              edgeQueue.insert([v, adjacents[i].source], adjacents[i].weight);
            }
          }
          if (adjacents[i].target != v) {
            if (!explored.has(adjacents[i].target)) {
              edgeQueue.insert([v, adjacents[i].target], adjacents[i].weight);
            }
          }
        }
        addStates(states, [], t, [], "", 7);
      } else {
        arr.pop();
        addStates(states, [], t, [], "", 8);
      }
    }
    addStates(
      states,
      [],
      states[states.length - 1].tree,
      [],
      "Total edges dequeued: " + dequeueTimes + "/" + graph.edges.length,
      9
    );

    if (explored.size != nodes.length) {
      throw ErrMessage.MST_NOT_FOUND;
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
export function boruvkas(graph) {
  try {
    let states = [
      {
        highlighted: [],
        tree: [],
        highlightedNodes: [],
        text: "",
        status: 0
      }
    ];
    let nodes = graph.nodes;
    let edges = graph.edges;

    let subset = new UnionFind(nodes);
    let num = nodes.length;
    // Initialize graph that'll contain the MST
    let MST = [];
    let previous = 0;
    let cheapest = [];
    let times = 0;

    while (num > 1) {
      times++;
      let hedge = []; //a copy of highlighted
      let hnode = []; //a copy of highlighted

      addStates(states, hedge, MST, hnode, "Number of components: " + num, 1);
      previous = num;
      for (let v = 0; v < nodes.length; v++) {
        cheapest[nodes[v].id] = -1;
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
      //Get all the components
      let parent = subset.parent;
      let set = new Set();
      let map = new Map();
      for (let i = 0; i < nodes.length; i++) {
        map.set(parent[nodes[i].id], new Set());
      }
      for (let i = 0; i < nodes.length; i++) {
        map.set(
          parent[nodes[i].id],
          map.get(parent[nodes[i].id]).add(nodes[i])
        );
        set.add(map.get(parent[nodes[i].id]));
      }
      let components = Array.from(set);
      //for each component find the smallest edge
      for (let i = 0; i < components.length; i++) {
        hnode = [];
        hedge = [];
        addStates(states, hedge, MST, hnode, "", 2);
        for (
          let it = components[i].values(), val = null;
          (val = it.next().value);

        ) {
          hnode.push(val.id);
        }
        //Highlight the component nodes
        addStates(states, hedge, MST, hnode, "", 3);
        for (
          let it = components[i].values(), val = null;
          (val = it.next().value);

        ) {
          let e = cheapest[val.id];
          if (e != -1) {
            hedge.push(e);
            //Highlight the cheapest edge of the component
            addStates(states, hedge, MST, hnode, "", 4);
          }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        let e = cheapest[nodes[i].id];
        if (e != -1) {
          let u = subset.find(e.source);
          let v = subset.find(e.target);
          if (u == v) continue;
          if (!subset.connected(u, v)) {
            MST.push(e);
            subset.union(u, v);
            num--;
          }
        }
      }

      addStates(states, [], MST, [], "", 5);

      if (num == previous) throw ErrMessage.MST_NOT_FOUND;
    }

    addStates(
      states,
      [],
      states[states.length - 1].tree,
      [],
      "Total number of iterations: " + times,
      6
    );

    return states;
  } catch (error) {
    return error.toString();
  }
}

/**
 * Boruvka Parallel algorithm
 * @param {*} edges
 * @param {*} nodes
 */
export function parallel(graph) {
  try {
    let states = [
      {
        highlighted: [],
        tree: [],
        highlightedNodes: [],
        text: "",
        status: 0
      }
    ];
    let nodes = graph.nodes;
    let edges = graph.edges;
    let subset = new UnionFind(nodes);
    let num = nodes.length;
    let times = 0;
    // Initialize graph that'll contain the MST
    let MST = [];
    let previous = 0;
    let cheapest = [];
    while (num > 1) {
      times++;
      let hedge = []; //a copy of highlighted
      let tedge = states[states.length - 1].tree.slice();
      let hnode = []; //a copy of highlighted

      addStates(states, hedge, tedge, hnode, "Number of components: " + num, 1);

      previous = num;
      for (let v = 0; v < nodes.length; v++) {
        cheapest[nodes[v].id] = -1;
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
      //Get all the componenets
      let parent = subset.parent;
      let set = new Set();
      let map = new Map();
      for (let i = 0; i < nodes.length; i++) {
        map.set(parent[nodes[i].id], new Set());
      }
      for (let i = 0; i < nodes.length; i++) {
        map.set(
          parent[nodes[i].id],
          map.get(parent[nodes[i].id]).add(nodes[i])
        );
        set.add(map.get(parent[nodes[i].id]));
      }
      let components = Array.from(set);
      //for each component find the smallest edge
      for (let i = 0; i < components.length; i++) {
        hnode = [];
        hedge = [];
        addStates(states, hedge, tedge, hnode, "", 2);
        for (
          let it = components[i].values(), val = null;
          (val = it.next().value);

        ) {
          hnode.push(val.id);
        }

        addStates(states, hedge, tedge, hnode, "", 3);
      }
      hnode = [];
      nodes.map(x => hnode.push(x.id));
      //Highlight all the component nodes
      addStates(states, hedge, tedge, hnode, "", 4);
      let temp = new Set();
      for (let i = 0; i < components.length; i++) {
        for (
          let it = components[i].values(), val = null;
          (val = it.next().value);

        ) {
          let e = cheapest[val.id];
          if (e != -1) {
            temp.add(e);
          }
        }
      }

      //Highlight all the components' cheapest edges
      hedge = Array.from(temp);
      addStates(states, hedge, tedge, hnode, "", 5);

      for (let i = 0; i < nodes.length; i++) {
        let e = cheapest[nodes[i].id];
        if (e != -1) {
          let u = subset.find(e.source);
          let v = subset.find(e.target);
          if (u == v) continue;
          if (!subset.connected(u, v)) {
            MST.push(e);
            tedge.push(e);
            subset.union(u, v);
            num--;
          }
        }
      }
      addStates(states, [], tedge, [], "", 6);
      if (num == previous) throw ErrMessage.MST_NOT_FOUND;
    }
    addStates(
      states,
      [],
      states[states.length - 1].tree,
      [],
      "Total number of executing in parallel: " + times,
      7
    );
    return states;
  } catch (error) {
    return error.toString();
  }
}
