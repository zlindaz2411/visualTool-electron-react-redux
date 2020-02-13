
import {UnionFind} from './lib/unionFind'
import {ErrMessage} from'../constants/errorMessage'
import {addStates} from './stateFunctions';
import {unionSet, getConnectedVertex, updateGateValue, findCheapest, getGatesValues} from '../functions/cmstAlgorithms';

/**
 * Esau-Williams algorithm that gives a suboptimal solution to the capacitated minimum spanning tree problem.
 * @param {*} capacity 
 * @param {*} graph 
 */
export function esauWilliams(graph, capacity) {
  try {
    // console.log("ahah")
    let edges = graph.edges.slice();
    let states = [{ highlighted: [], tree: [], status: 0 }];
    let hnode = [];
    let tedge = [];
    let root = graph.root;
    let nodes = graph.nodes.slice();
    let uf = new UnionFind(nodes);
    
    let CMST = new Set();
    let savings = new Map();
    let components = {};
    let rootAdjacents = graph.getAdjacentsOfNode(root.id);
    let gates = getGatesValues(rootAdjacents, root.id)
    addStates(states, [], [], tedge, 1);


    //Initialize the components to be vertex-set
    for (let i = 0; i < nodes.length; i++) {
      components[nodes[i].id] = new Set([nodes[i].id]);
    }
    //While the edges in the CMST is less than the nodes length -1
    let len =  nodes.length;
    while (CMST.size <len- 1  && edges.length >0) {
      addStates(states, [], [], tedge, 2);
      
      //For each node, set the tradeoff cost with the closest connected node
      for (let i = 0; i < nodes.length; i++) { 
        if (nodes[i].id == root.id) continue;
        else {
          hnode = [];
          hnode.push(nodes[i].id)
          addStates(states, [], tedge, hnode, 3);
          let cheapest = findCheapest(nodes[i].id, edges)
          
          let closest = cheapest[0]
          if (!closest) {
            savings.delete(nodes[i])
            nodes.splice(i, 1)
            i--;
            continue;
          };
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

      //Get the node with the biggest tradeoff
      if(savings.size == 0) throw ErrMessage.CMST_NOT_FOUND
      let max_saving = [...savings.entries()].reduce((a, e) =>
        e[1] < a[1] ? e : a
      );

      let source = max_saving[0].id;
      let edge = findCheapest(source, edges)[0]
      let target = getConnectedVertex(source, edge);

      hnode.push(source)
      hedge.push(edge)
      addStates(states, [], tedge, hnode, 6);
      addStates(states, hedge, tedge, hnode, 7);


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
    if(CMST.size != len-1){
      throw ErrMessage.CMST_NOT_FOUND
    }
    return states;
  } catch (e) {
    return e.toString();
  }
}


