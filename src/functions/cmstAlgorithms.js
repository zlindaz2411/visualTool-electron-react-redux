
import {UnionFind} from './lib/unionFind'
import {ErrMessage} from'../constants/errorMessage'


/**
 * Esau-Williams algorithm that gives a suboptimal solution to the capacitated minimum spanning tree problem.
 * @param {*} capacity 
 * @param {*} graph 
 */
export function esauWilliams(capacity, graph) {
    try {
      let root = graph.root;
      let nodes = graph.nodes;
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
       // if(nodes[i].id != root.id) 
        components[nodes[i].id] = new Set([nodes[i].id]);
        if (!gates.has(nodes[i].id)) gates.set(nodes[i].id, 0);
      }
      //While the edges in the CMST is less than the nodes length -1
      while (CMST.size < nodes.length - 1) {
        //For each node, set the tradeoff cost with the closest connected node
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id == root.id) continue;
          else {
            let adjacents = graph
              .getAdjacentsOfNode(nodes[i].id)
              .sort((a, b) => a.weight - b.weight);
            let min = Number.MAX_SAFE_INTEGER;
            for (let j = 0; j < adjacents.length; j++) {
              if (adjacents[j].weight < min) min = adjacents[j].weight;
            }
            let gateValue = gates.get(nodes[i].id);
            savings.set(nodes[i], min - gateValue);
          }
        }
        //Get the node with the biggest tradeoff
        let max_saving = [...savings.entries()].reduce((a, e) =>
          e[1] < a[1] ? e : a
        );
  
        let source = max_saving[0].id;
  
        let edge = graph
          .getAdjacentsOfNode(source)
          .sort((a, b) => a.weight - b.weight)[0];
        if (!edge) throw ErrMessage.CMST_NOT_FOUND;
        let target = getConnectedVertex(source, edge);
  
        let u = uf.find(source);
        let v = uf.find(target);
        //Check if two nodes do not form a cycle
        if (u != v) {
          let componentCapacity = unionSet(
            components[source],
            components[target]
          ).size
  
          //If the target of the is root, then the component Capacity should be set to less to one
          //as the CMSTP only constrains the subtree of the root to satisfy the constraint
          let c = target == root.id ? componentCapacity - 1 : componentCapacity;
          //Check if CMST U (u,v) doesn't violate capacity constraint
          if (c <= capacity) {
            //Update the components
            let union = unionSet(components[source], components[target])
            components[source] = union
            components[target] = union
            for (let it = components[target].values(), val = null; (val = it.next().value); ) {
              if(val != source && val != target){
                  components[val] = union
              }
            }
            components[root.id] = new Set([root.id])

            updateGateValue(components[source], gates);
            uf.union(source, target);
            CMST.add(edge);
  
          }
        }
        graph.removeEdge(graph.edges.indexOf(edge));
      }
  
      return CMST;
    } catch (e) {
      return e.toString();
    }
  }
    
/**
 * Return the size of the component
 * @param {*} componentA 
 * @param {*} componentB 
 */
function getComponentCapacity(componentA, componentB){
    let set = new Set();
    for (let it = componentA.values(), val= null; val=it.next().value; ) {
        set.add(val)
    }
    for (let it = componentB.values(), val= null; val=it.next().value; ) {
        set.add(val)
    }
    return set.size;
}
/**
 * Perform union of two sets
 * @param {*} componentA 
 * @param {*} componentB 
 */
function unionSet(componentA, componentB){
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
 * Return the connected vertex given source or target.
 * @param {*} id 
 * @param {*} edge 
 */
function getConnectedVertex(id, edge){
    if(edge.source == id){
        return edge.target
    }
    return edge.source;
}

/**
 * Update the components edge weight connected to the root to be the smallest.
 * @param {*} component
 * @param {*} gates 
 */
function updateGateValue(component, gates){
    let min = Number.MAX_SAFE_INTEGER;
    for (let it = component.values(), val= null; val=it.next().value; ) {
        if(gates.get(val) <min) min = gates.get(val);
    }
    for (let it = component.values(), val= null; val=it.next().value; ) {
        gates.set(val, min)
    }
}