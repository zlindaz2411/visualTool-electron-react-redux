import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";


/**
 * Kruskals algorithm + 2 opt algorithm for computing DCMST
 * @param {*} edges
 * @param {*} nodes
 */
export function kruskalConstrained(graph, degree) {
  try {
    //Sort the edges
    let nodes = graph.nodes;
    let edges = graph.edges.sort((a, b) => {
      return a.weight - b.weight;
    });
    
    // Initialize graph that'll contain the DCMST
    let DCMST = new Set();

    let degrees = {}
    
    for(let i= 0;i<nodes.length;i++){
        degrees[nodes[i].id] = 0;
    }
    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for (let i = 0; i < edges.length; i++) {
      let u = edges[i].source;
      let v = edges[i].target;


      //if edges[i] in MST is not acyclic
      if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
        DCMST.add(edges[i])
        degrees[u] +=1;
        degrees[v] +=1;
        uf.union(u,v)
     }
    }

    if (DCMST.size != nodes.length-1) {
      throw ErrMessage.DCMST_NOT_FOUND;
    }
    return states;
  } catch (error) {
    return error.toString();
  }
}

function two_opt(mst, originalGraph){
  let nodes = originalGraph.nodes
  let minWeight = getWeight(mst);
  while(true){
    let startWeight = minWeight
    for(let i=1; i<nodes.length; i++){
      for(let j=i+2; j<nodes.length; j++){
        let oldEdge1 = getEdge(mst, nodes[i-1].id, nodes[i].id)
        let oldEdge2 = getEdge(mst, nodes[j-1].id, nodes[j].id)
          if(oldEdge1 && oldEdge2){      
            let newEdge1 =getEdge(originalGraph.edges, oldEdge1.source, oldEdge2.source)
            let newEdge2 =getEdge(originalGraph.edges, oldEdge1.target, oldEdge2.target)
            if(newEdge1 && newEdge2){
              if(newEdge1.weight + newEdge2.weight < oldEdge1.weight + oldEdge2.weight){
                 mst.splice(mst.indexOf(oldEdge1),1)
                 mst.splice(mst.indexOf(oldEdge2),1)            
                 mst.push(newEdge1)
                 mst.push(newEdge2)
                 minWeight = getWeight(mst)
              }
            }
          }
      }
    }
    if(startWeight == minWeight){
      break;
    }
  }
  
  return mst;
}

export function getEdge(edges,source, target){
  for(let i=0;i<edges.length; i++){
    if(edges[i].source == source && edges[i].target == target) return edges[i]
    else if(edges[i].source == target && edges[i].target == source) return edges[i]
  }
  return null
}

export function getWeight(path){
  let weight = 0;
  for(let i= 0;i<path.length; i++){
    weight +=path[i].weight
  }
  return weight
}
