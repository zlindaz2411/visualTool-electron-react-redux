
import {UnionFind} from './lib/unionFind'
import {ErrMessage} from'../constants/errorMessage'
import {addStates} from './stateFunctions';
import {unionSet, getConnectedVertex, updateGateValue, findCheapest} from '../functions/cmstAlgorithms';

/**
 * Esau-Williams algorithm that gives a suboptimal solution to the capacitated minimum spanning tree problem.
 * @param {*} capacity 
 * @param {*} graph 
 */
export function esauWilliams(graph, capacity) {
  try {
    // console.log("ahah")
    let edges = graph.edges.slice().sort((a,b) => a.weight - b.weight);
    let states = [{ highlighted: [], tree: [], status: 0 }];
    let hnode = [];
    let tedge = [];
    let root = graph.root;
    let nodes = graph.nodes;
    let uf = new UnionFind(nodes);
    let gates = new Map();
    let CMST = new Set();
    let savings = new Map();
    let components = {};
    let rootAdjacents = graph.getAdjacentsOfNode(root.id);

    addStates(states, [], [], tedge, 1);

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
      addStates(states, [], [], tedge, 2);
      hnode = [];
      //For each node, set the tradeoff cost with the closest connected node
      for (let i = 0; i < nodes.length; i++) { 
        if (nodes[i].id == root.id) continue;
        else {
          hnode.push(nodes[i].id)
          addStates(states, [], tedge, hnode, 3);
          let cheapest = findCheapest(nodes[i].id, edges)
          
          let closest = cheapest[0]
          if (!closest) throw ErrMessage.CMST_NOT_FOUND;
          hnode.push(cheapest[1])
          addStates(states, [], tedge, hnode, 4);
          addStates(states, [], tedge, hnode, 5);
          
          let gateValue = gates.get(nodes[i].id);
          savings.set(nodes[i], closest.weight - gateValue);
        }
        hnode = [];
      }
      let hedge = [];
      hnode = [];

      let max_savings= [];
      for(const [key, value] of savings.entries()){
        if(value == Math.min(...savings.values())){
          max_savings.push(key)
        }
      } 
      //Get the node with the biggest tradeoff
      let edge;
      let min=Number.MAX_SAFE_INTEGER;
      for(let m =0; m<max_savings.length; m++){
       
           let temp= findCheapest(max_savings[m].id, edges)[0]
           if(temp.weight<min){
             min = temp.weight
             edge=temp;
           }
        }

      let source = edge.source
      hnode.push(source)
      
      if (!edge) throw ErrMessage.CMST_NOT_FOUND;
      
      hedge.push(edge)
      addStates(states, [], tedge, hnode, 6);
      addStates(states, hedge, tedge, hnode, 7);

      let target = edge.target

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
          addStates(states, hedge, tedge, hnode, 8);
          tedge.push(edge)
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

      addStates(states, [], tedge, [], 9);
      edges.splice(edges.indexOf(edge), 1);
      addStates(states, [], tedge, [], 10);
    }
    
    addStates(states, [], tedge, [], 11);
    
    return states;
  } catch (e) {
    return e.toString();
  }
}


