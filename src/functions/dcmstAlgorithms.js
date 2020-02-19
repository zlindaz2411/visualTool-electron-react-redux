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
  let path = [];
  for(let i =0;i<mst.length;i++){
    if(path.indexOf(mst[i].source) == -1){
        path.push(mst[i].source)
    }
    if(path.indexOf(mst[i].target) == -1){
        path.push(mst[i].target)
    }
  }
  while(true){
    let startWeight = minWeight
    for(let i=1; i<nodes.length; i++){
      for(let j=i+2; j<nodes.length; j++){
          let newPath = swapEdges(path, i, j)
          let newMST = getNewMST(newPath, originalGraph)
          let newWeight = getWeight(newMST)
          if(newWeight < minWeight){
            minWeight = newWeight;
            path = newPath.slice();
            mst = newMST.slice()
          }
      }
    }
    if(startWeight == minWeight){
      break;
    }
  }
  
  return mst;
}

function getNewMST(path, originalGraph){
  let newMST = [];
  for(let i =0;i<path.length-1; i++){
    
    let adjacents = originalGraph.getAdjacentsOfNode(path[i])
    for(let j =0; j<adjacents.length; j++){
      
      if(adjacents[j].source == path[i] && adjacents[j].target == path[i+1]){
        newMST.push(adjacents[j]);
        break;
      }
      if(adjacents[j].target == path[i] && adjacents[j].source == path[i+1]){
        newMST.push(adjacents[j]);
        break;
      }
    }
  }
  return newMST
}

function swapEdges(path, i, k){
  let newPath = path.slice(0, i);
  let reverse = path.slice(i, k).reverse();
  return newPath.concat(reverse).concat(path.slice(k));
}

function getEdge(edges,source, target){
  for(let i=0;i<edges.length; i++){
    if(edges[i].source == source && edges[i].target == target) return edges[i]
    else if(edges[i].source == target && edges[i].target == source) return edges[i]
  }
  //console.log("not found")
  return null
}
function getWeight(path){
  let weight = 0;
  for(let i= 0;i<path.length; i++){
    weight +=path[i].weight
  }
  return weight
}