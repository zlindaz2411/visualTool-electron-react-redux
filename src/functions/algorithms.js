import { UnionFind } from "../functions/lib/unionFind";
import { PriorityQueueHeap } from "../functions/lib/priorityQueue";
import { ErrMessage } from "../constants/errorMessage";

/**
 * Add highlighted elements and status in the state list.
 * @param {*} states 
 * @param {*} hedge 
 * @param {*} tedge 
 * @param {*} hnode 
 * @param {*} status 
 */
export function addStates(states, hedge, tedge, hnode, status){
    states.push({
      highlighted:hedge.slice(),
      tree: tedge.slice(),
      highlightedNodes : hnode.slice(),
      status: status,
    });
}

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
    addStates(states,[],[],[], 1)

    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for (let i = 0; i < edges.length; i++) {
      let arr = []; //a copy of highlighted
      let t = states[states.length - 1].tree.slice();
      
      addStates(states, arr, t, [],2)
      let u = edges[i].source;
      let v = edges[i].target;

      arr.push(edges[i]);
      addStates(states, arr, t,[], 3)
      //if edges[i] in MST is not acyclic
      addStates(states, arr, t, [],4)
      if (!uf.connected(u, v)) {
        MST.add(edges[i]);
        uf.union(u, v);
        check.add(u);
        check.add(v);
        t.push(edges[i]);
        addStates(states, arr, t, [],5)
      } else {
        arr.pop();
        addStates(states, arr, t, [],6)
      }
    }
    console.log(MST);

    addStates(states, states[states.length - 1].highlighted, states[states.length - 1].tree, [],7)

    if (check.size != nodes.length) {
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
export function prims(root, nodes, edges) {
  try {
    let states = [{ highlighted: [], tree: [], status: 0 }];
    // Initialize graph that'll contain the MST
    let MST = new Set();
    addStates(states, [], [], [],1)
    // Select first node as starting node
    let s = root;
    // Create a Priority Queue and explored set
    let edgeQueue = new PriorityQueueHeap();
    let explored = new Set();
    explored.add(s.id);

    // Add all edges from this starting node to the PQ taking weights as priority
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].source == s.id) {
        edgeQueue.insert([s.id, edges[i].target], edges[i].weight);
      }
      if (edges[i].target == s.id) {
        edgeQueue.insert([s.id, edges[i].source], edges[i].weight);
      }
    }

    addStates(states, [], [], [],2)

    // Take the smallest edge and add that to the new graph
    while (!edgeQueue.isEmpty()) {
      // Continue removing edges till we get an edge with an unexplored node

      let arr = []; //a copy of highlighted
      let t = states[states.length - 1].tree.slice();
      
      addStates(states, arr, t, [],3)

      let currentMinEdge = edgeQueue.extractMin();

      let u = currentMinEdge.element[0];
      let v = currentMinEdge.element[1];

      arr.push({ source: u, target: v });
      addStates(states, arr, t, [],4)
      addStates(states, arr, t, [],5)

      if (!explored.has(v)) {
          explored.add(v);
          MST.add([u, v, currentMinEdge.priority]);
          t.push({ source: u, target: v });
          addStates(states, arr, t, [],6)
          let temp = arr.slice();
          for (let i = 0; i < edges.length; i++) {
            if (edges[i].source == v) {
              if (
                !explored.has(edges[i].target) &&
                !explored.has(edges[i].target)
              ) {
                edgeQueue.insert([v, edges[i].target], edges[i].weight);
                temp.push(edges[i]);
              }
            }
            if (edges[i].target == v) {
              if (
                !explored.has(edges[i].source) &&
                !explored.has(edges[i].source)
              ) {
                edgeQueue.insert([v, edges[i].source], edges[i].weight);
                temp.push(edges[i]);
              }
            }
          }
          addStates(states, temp, t, [],7)
        } else {
          arr.pop();
          addStates(states, arr, t, [],8)
        }
    }
    addStates(states, states[states.length - 1].highlighted, states[states.length - 1].tree, [],9)

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
export function boruvkas(nodes, edges) {
  try {
    let states = [
      {
        highlighted: [],
        tree: [],
        highlightedNodes: [],
        status: 0
      }
    ];

    addStates(states, [], [], [],1)
    let subset = new UnionFind(nodes);
    let num = nodes.length;
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let previous = 0;
    let current = num;
    let cheapest = [];
      while(num>1){
        let hedge = [];//a copy of highlighted
        let tedge = states[states.length - 1].tree.slice();
        let hnode = [] //a copy of highlighted

        addStates(states, hedge, tedge, hnode,2)

        previous = current;
        for(let v=0;v<num;v++){
              cheapest[nodes[v].id]= -1;
        }
        for(let i =0;i<edges.length;i++){
            let u = subset.find(edges[i].source);
            let v = subset.find(edges[i].target);
            if(u==v) continue; 
            else{
                if(cheapest[u] == -1 || edges[i].weight < cheapest[u].weight) cheapest[u]=edges[i]
                if(cheapest[v] == -1 || edges[i].weight < cheapest[v].weight) cheapest[v]=edges[i]
            }
        }
        //Get all the componenets
        let parent = subset.parent;
        let set = new Set();
        let map = new Map();
        for(let i =0;i<nodes.length;i++){
            map.set(parent[nodes[i].id], new Set());
        }
        for(let i =0;i<nodes.length;i++){         
            map.set(parent[nodes[i].id], map.get(parent[nodes[i].id]).add(nodes[i]));
            set.add(map.get(parent[nodes[i].id]));
        }
        let components = Array.from(set)
        //for each component find the smallest edge
        for(let i =0;i<components.length;i++){ 
          hnode = [];
          hedge = [];
          addStates(states,hedge, tedge, hnode,3)
            for (let it = components[i].values(), val= null; val=it.next().value; ) {
               hnode.push(val.id);
            }
            //Highlight the component nodes
            addStates(states,hedge, tedge, hnode,4)
            for (let it = components[i].values(), val= null; val=it.next().value; ) {
                let e = cheapest[val.id];  
                if(e!=-1){
                  hedge.push(e);
                  //Highlight the cheapest edge of the component
                  addStates(states,hedge, tedge, hnode,5)
                    let u = subset.find(e.source);
                    let v = subset.find(e.target);
                    if(u==v) continue;
                    if(!subset.connected(u,v)){
                      addStates(states,hedge, tedge, hnode,6)
                        MST.add(e);
                        subset.union(u,v);
                        tedge.push(e);
                        addStates(states,hedge, tedge, hnode,7)
                        num--;
                    }else{
                      hedge.pop();
                      addStates(states,hedge, tedge, hnode,8)
                    } 
                }
            }
        }
      current = num;
      if (current == previous) throw ErrMessage.MST_NOT_FOUND;
    }
    addStates(states,[], states[states.length - 1].tree, [],9)

  
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
 export function parallel(nodes, edges) {
  try {
    let states = [
      {
        highlighted: [],
        tree: [],
        highlightedNodes: [],
        status: 0
      }
    ];

    addStates(states, [], [], [],1)
    let subset = new UnionFind(nodes);
    let num = nodes.length;
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let previous = 0;
    let current = num;
    let cheapest = [];
      while(num>1){
        let hedge = [];//a copy of highlighted
        let tedge = states[states.length - 1].tree.slice();
        let hnode = [] //a copy of highlighted

        addStates(states, hedge, tedge, hnode,2)

        previous = current;
        for(let v=0;v<nodes.length;v++){
              cheapest[nodes[v].id]= -1;
        }
        for(let i =0;i<edges.length;i++){
            let u = subset.find(edges[i].source);
            let v = subset.find(edges[i].target);
            if(u==v) continue; 
            else{
                if(cheapest[u] == -1 || edges[i].weight < cheapest[u].weight) cheapest[u]=edges[i]
                if(cheapest[v] == -1 || edges[i].weight < cheapest[v].weight) cheapest[v]=edges[i]
            }
        }
        //Get all the componenets
        let parent = subset.parent;
        let set = new Set();
        let map = new Map();
        for(let i =0;i<nodes.length;i++){
            map.set(parent[nodes[i].id], new Set());
        }
        for(let i =0;i<nodes.length;i++){         
            map.set(parent[nodes[i].id], map.get(parent[nodes[i].id]).add(nodes[i]));
            set.add(map.get(parent[nodes[i].id]));
        }
        let components = Array.from(set)
        //for each component find the smallest edge
        for(let i =0;i<components.length;i++){ 
          hnode = [];
          hedge = [];
          addStates(states,hedge, tedge, hnode,3)
            for (let it = components[i].values(), val= null; val=it.next().value; ) {
               hnode.push(val.id);
            }
            
            addStates(states,hedge, tedge, hnode,4)
          }
          hnode = [];
          nodes.map(x=> hnode.push(x.id));
          //Highlight all the component nodes
          addStates(states, hedge, tedge, hnode ,5);
          let temp = new Set();
          for(let i =0;i<components.length;i++){         
              for (let it = components[i].values(), val= null; val=it.next().value;) {
                  let e = cheapest[val.id];  
                  if(e!=-1){
                  temp.add(e);
                  }
                  }
          }
          //Highlight all the components' cheapest edges
          hedge = Array.from(temp);
          addStates(states, hedge, tedge, hnode, 6);
          let copy = hedge.slice();    
          for(let i= 0;i<copy.length;i++){
              let e = copy[i];  
              hedge = [];
              hnode = [];
              if(e!=-1){  
                    hedge.push(e);
                    addStates(states,hedge, tedge, hnode, 7)
                      let u = subset.find(e.source);
                      let v = subset.find(e.target);
                      if(u==v) continue;
                      if(!subset.connected(u,v)){
                      addStates(states,hedge, tedge, hnode,8)
                          MST.add(e);
                          subset.union(u,v);
                          tedge.push(e);
                          addStates(states,hedge, tedge, hnode,9)
                          num--;
                      }else{
                      hedge.pop();
                      addStates(states,hedge, tedge, hnode,10)
                      } 
          }
        }
      current = num;
      if (current == previous) throw ErrMessage.MST_NOT_FOUND;
    }
    addStates(states,[], states[states.length - 1].tree, [],11)

    return states;
  } catch (error) {
    return error.toString();
  }
}
