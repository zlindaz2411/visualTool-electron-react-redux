
import {UnionFind} from './lib/unionFind'
import {ErrMessage} from'../constants/errorMessage'


/**
 * Esau-Williams algorithm that gives a suboptimal solution to the capacitated minimum spanning tree problem.
 * @param {*} capacity 
 * @param {*} graph 
 */
export function esauWilliams(graph, capacity) {
  try {
    let edges = graph.edges.slice()
    let root = graph.root;
    let nodes = graph.nodes.slice();
    let uf = new UnionFind(nodes);
    let gates = new Map();
    let CMST = new Set();
    let savings = new Map();
    let components = {};
    let rootAdjacents = graph.getAdjacentsOfNode(root.id);

    for (let i = 0; i < rootAdjacents.length; i++) {
      if (rootAdjacents[i].source != root.id)
        gates.set(rootAdjacents[i].source, rootAdjacents[i].weight);
      if (rootAdjacents[i].target != root.id)
        gates.set(rootAdjacents[i].target, rootAdjacents[i].weight);
    }

    //Initialize the components to be vertex-set
    for (let i = 0; i < nodes.length; i++) {
      components[nodes[i].id] = new Set([nodes[i].id]);
    }
    //While the edges in the CMST is less than the nodes length -1
    let len =  nodes.length;
    while (CMST.size <len - 1  && edges.length >0) {
      //For each node, set the tradeoff cost with the closest connected node
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id == root.id) continue;
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
        let c = target == root.id ? componentCapacity - 1 : componentCapacity;
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
          components[root.id] = new Set([root.id])
          updateGateValue(components[source], gates);
          uf.union(source, target);
          CMST.add(edge);
        }
      }
      edges.splice(edges.indexOf(edge), 1);
    }
    if(CMST.size != len-1){
      throw ErrMessage.CMST_NOT_FOUND
    }
    

    return CMST;
  } catch (e) {
    return e.toString();
  }
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