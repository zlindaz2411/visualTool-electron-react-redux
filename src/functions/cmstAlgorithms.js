
import {UnionFind} from './lib/unionFind'
import {ErrMessage} from'../constants/errorMessage'


/**
 * Esau-Williams algorithm that gives a suboptimal solution to the capacitated minimum spanning tree problem.
 * @param {*} capacity 
 * @param {*} graph 
 */
export function esauWilliams(graph, capacity) {
  try {
    let edges = graph.edges.slice();
    let nodes = graph.nodes.slice();
    let root = findRoot(nodes, edges)
    if(root == -1) throw ErrMessage.CMST_NOT_FOUND

    let uf = new UnionFind(nodes);
    
    let CMST = []
    let savings = new Map();
    let components = {};
    let rootAdjacents = graph.getAdjacentsOfNode(root);

    let gates = getGatesValues(rootAdjacents, root)

    //Initialize the components to be vertex-set
    for (let i = 0; i < nodes.length; i++) {
      components[nodes[i].id] = new Set([nodes[i].id]);
    }
    //While the edges in the CMST is less than the nodes length -1
    let len =  nodes.length;
    while (CMST.length <len - 1  && edges.length >0) {
      //For each node, set the tradeoff cost with the closest connected node
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id == root) continue;
        else {
          let cheapest = findCheapest(nodes[i].id, edges)
          let closest = cheapest[0]
          if (!closest) {
            savings.delete(nodes[i])
            nodes.splice(i, 1)
            i--;
            continue;
          };
          let gateValue = gates.get(nodes[i].id);
          savings.set(nodes[i], closest.weight - gateValue);
        }
      }
      //Get the node with the biggest tradeoff
      if(savings.size == 0) throw ErrMessage.CMST_NOT_FOUND
      let max_saving = [...savings.entries()].reduce((a, e) =>
        e[1] < a[1] ? e : a
      );

      let source = max_saving[0].id;
      let edge = findCheapest(source, edges)[0]
      let target = getConnectedVertex(source, edge);

      //Check if two nodes do not form a cycle
      if(!uf.connected(source,target)){
        let componentCapacity = unionSet(
          components[source],
          components[target]
        ).size

        //If the target of the is root, then the component Capacity should be set to less to one
        //as the CMSTP only constrains the subtree of the root to satisfy the constraint
        let c = target == root ? componentCapacity - 1 : componentCapacity;
        //Check if CMST U (u,v) doesn't violate capacity constraint
        if (c <= capacity) {
          let temp= unionSet(components[source], components[target])
          components[source] = temp
          components[target] = temp
          for (let it = components[target].values(), val = null; (val = it.next().value); ) {
            if(val != source && val != target){
                components[val] = temp
            }
          }
          components[root] = new Set([root.id])
          updateGateValue(components[source], gates);
          uf.union(source, target);
          CMST.push(edge);
        }
      }
      edges.splice(edges.indexOf(edge), 1);
    }
    if(CMST.length != len-1){
      throw ErrMessage.CMST_NOT_FOUND
    }
    

    return CMST;
  } catch (e) {
    return e.toString();
  }
}

/**
 * 
 * @param {*} nodes 
 * @param {*} edges 
 */
export function getGatesValues(rootAdjacents, root){
  let gates = new Map();
  for (let i = 0; i < rootAdjacents.length; i++) {
    if (rootAdjacents[i].source != root)
      gates.set(rootAdjacents[i].source, rootAdjacents[i].weight);
    if (rootAdjacents[i].target != root)
      gates.set(rootAdjacents[i].target, rootAdjacents[i].weight);
  }
  return gates;
}

/**
 * Find the root for the CMST algorithm: the root should be the node with the highest number of adjacent nodes
 * @param {*} nodes 
 * @param {*} edges 
 */
function findRoot(nodes, edges){
  let nodeConnection = new Map();
  for(let i =0;i<edges.length; i++){
      if(!nodeConnection.has(edges[i].source)){
        nodeConnection.set(edges[i].source, 1);
      }
      else{
        nodeConnection.set(edges[i].source, nodeConnection.get(edges[i].source)+1);
      }
      if(!nodeConnection.has(edges[i].target)){
        nodeConnection.set(edges[i].target, 1);
      }
      else{
        nodeConnection.set(edges[i].target, nodeConnection.get(edges[i].target)+1);
      }
  }
  return [...nodeConnection.entries()].reduce((a, e ) => e[1] > a[1] ? e : a)[0];
}

/**
 * Find the other endpoint of the edge given id
 * @param {*} id 
 * @param {*} edge 
 */
export function getConnectedVertex(id, edge) {
  if (edge.source == id) {
    return edge.target;
  }
  return edge.source;
}

/**
 * Perform union of two sets
 * @param {*} componentA 
 * @param {*} componentB 
 */
export function unionSet(componentA, componentB){
    let set = new Set();
    for (let it = componentA.values(), val = null; (val = it.next().value); ) {
      set.add(val);
    }
    for (let it = componentB.values(), val = null; (val = it.next().value); ) {
      set.add(val);
    }
    return set;
}

/**
 * Update the components edge weight connected to the root to be the smallest.
 * @param {*} component
 * @param {*} gates 
 */
export function updateGateValue(component, gates){
    let min = Number.MAX_SAFE_INTEGER;
    for (let it = component.values(), val= null; val=it.next().value; ) {
        if(gates.get(val) <min) min = gates.get(val);
    }
    for (let it = component.values(), val= null; val=it.next().value; ) {
        gates.set(val, min)
    }
}

/**
 * Find the cheapest edge adjacent to given node id.
 * @param {*} id 
 * @param {*} edges 
 */
export function findCheapest(id, edges){
  let min = Number.MAX_SAFE_INTEGER;
  let minEdge;
  let source;
  for(let i =0; i< edges.length; i++){
    if(edges[i].source == id && edges[i].weight < min){
      source = edges[i].target;
      min = edges[i].weight
      minEdge = edges[i]
    }
    else if(edges[i].target == id && edges[i].weight < min){
      source = edges[i].source;
      min = edges[i].weight
      minEdge = edges[i]
    }
  }
  return [minEdge, source];
}