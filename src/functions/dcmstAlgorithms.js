import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";


// /**
//  * Kruskals algorithm + 2 opt algorithm for computing DCMST
//  * @param {*} edges
//  * @param {*} nodes
//  */
// export function kruskalConstrained(graph, degree) {
//   try {
//     //Sort the edges
//     let nodes = graph.nodes;
//     let edges = graph.edges.sort((a, b) => {
//       return a.weight - b.weight;
//     });
    
//     // Initialize graph that'll contain the DCMST
//     let DCMST = new Set();

//     let degrees = {}
    
//     for(let i= 0;i<nodes.length;i++){
//         degrees[nodes[i].id] = 0;
//     }
//     let uf = new UnionFind(nodes);
//     // Add all edges to the Queue:
//     for (let i = 0; i < edges.length; i++) {
//       let u = edges[i].source;
//       let v = edges[i].target;


//       //if edges[i] in MST is not acyclic
//       if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
//         DCMST.add(edges[i])
//         degrees[u] +=1;
//         degrees[v] +=1;
//         uf.union(u,v)
//      }
//     }

//     if (DCMST.size != nodes.length-1) {
//       throw ErrMessage.DCMST_NOT_FOUND;
//     }
//     return states;
//   } catch (error) {
//     return error.toString();
//   }
// }

export function kruskalConstrained(graph, degree) {
  try{
  //Sort the edges 
  let nodes = graph.nodes
  let degrees = {}
  let unsafeNodes = populateUnsafeNodes(graph.edges, degree)
  
  for(let i= 0;i<nodes.length;i++){
      degrees[nodes[i].id] = 0;
  }

  let edges = graph.edges.sort((a,b) => {return a.weight - b.weight;});
  // Initialize graph that'll contain the MST
  let MST = []
  let uf = new UnionFind(nodes);
  // Add all edges to the Queue:
  for(let i =0;i<edges.length;i++){
      let u = edges[i].source;
      let v = edges[i].target;
      if(unsafeNodes.indexOf(u) == -1 && unsafeNodes.indexOf(v) == -1){
      //if edges[i] in MST is not acyclic
      if(!uf.connected(u,v) && degrees[u] +1 <= degree && degrees[v]+1 <= degree){
         MST.push(edges[i])
         degrees[u] +=1;
         degrees[v] +=1;
         uf.union(u,v)
      }
    }
  }
  
  for(let i=0;i<unsafeNodes.length; i++){
    let adjacents = graph.getAdjacentsOfNode(unsafeNodes[i]).sort((a,b) => {return a.weight - b.weight;});
    
    for(let j =0;j<adjacents.length;j++){
        let u = adjacents[j].source;
        let v = adjacents[j].target;
        if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
          MST.push(adjacents[j])
          degrees[u] +=1;
          degrees[v] +=1;
          uf.union(u,v)
       }
    }
  }
  one_opt(MST,graph, degrees, degree)
  //check if is a minimum spanning tree
  if(MST.length != nodes.length-1){
      throw ErrMessage.MST_NOT_FOUND
  }
  return MST;
  }
  catch(error){
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



function one_opt(mst, originalGraph, degrees, degree){
  for(let i=0; i<mst.length; i++){
    let endPoints = getCommonEnd(mst[i],originalGraph.edges, originalGraph.nodes)
    for(let m =0;m<endPoints.length;m++){
      let first = endPoints[m][0]
      let second = endPoints[m][1]
      let firstIndex = findIndex(first, mst)
      let secondIndex = findIndex(second,mst)
      if(first && second){
     
      if(first.weight < second.weight){
        if(firstIndex== -1 && secondIndex != -1 ){
          mst.splice(secondIndex,1)
          degrees[second.source] -=1;
          degrees[second.target] -=1;
          if(degrees[first.source]+1<= degree && degrees[first.target]+1 <=degree){
            mst.push(first)
            degrees[first.source] +=1;
            degrees[first.target] +=1;
          }
          else{
            mst.push(second)
            degrees[second.source] +=1;
            degrees[second.target] +=1;
          }
        }
      }
      else if(second.weight < first.weight){
        if(secondIndex== -1 && firstIndex != -1 ){
          mst.splice(firstIndex,1)
          degrees[first.source] -=1;
          degrees[first.target] -=1;
          if(degrees[second.source]+1 <= degree && degrees[second.target]+1 <= degree){
            mst.push(second)
            degrees[second.source] +=1;
            degrees[second.target] +=1;
          }
          else{
            mst.push(first)
            degrees[first.source] +=1;
            degrees[first.target] +=1;
          }
      }
      }
      }
    }
}

return mst;
}


export function findIndex(edge, edges){
  for(let i=0;i<edges.length;i++){
    if(edges[i].source == edge.source && edges[i].target ==edge.target || 
      edges[i].target == edge.source && edges[i].source == edge.target){   
     return i;
      }
  };
  return -1
}

export function getCommonEnd(edge, edges, nodes){
    let candidate = [] 
    for(let i =0;i<nodes.length;i++){
        let temp = findEdge(edge,edges, nodes[i])
        if(temp.length ==2 && candidate.indexOf(temp) == -1){
          candidate.push(temp)
        }
    }
  return candidate
}

export function findEdge(edge, edges, node){
   let found = []
    for(let i=0;i<edges.length;i++){
      if(edges[i].source == edge.source && edges[i].target ==node.id || 
        edges[i].target == edge.source && edges[i].source ==node.id)
       {
         found.push(edges[i])
       }
       if(edges[i].target == edge.target && edges[i].source ==node.id || 
        edges[i].source == edge.target && edges[i].target ==node.id)
       {
         found.push(edges[i])
       }
   };
   return found;
}

/**
 * Get the sum of the weights of a path
 * @param {*} path 
 */
export function getWeight(path){
    let weight = 0;
    for(let i= 0;i<path.length; i++){
      weight +=path[i].weight
    }
    return weight
  }

export function populateUnsafeNodes(edgesDegree, degree){
  let unsafeNodes = new Set();
  let map = new Map();
  for(let i =0;i<edgesDegree.length;i++){
    if(!map.has(edgesDegree[i].source)) map.set(edgesDegree[i].source,1)
    else map.set(edgesDegree[i].source, map.get(edgesDegree[i].source)+1)
    if(!map.has(edgesDegree[i].target)) map.set(edgesDegree[i].target,1)
    else map.set(edgesDegree[i].target, map.get(edgesDegree[i].target)+1)
    if(map.get(edgesDegree[i].source)-degree > 1) unsafeNodes.add(edgesDegree[i].source) 
    if(map.get(edgesDegree[i].target)-degree > 1) unsafeNodes.add(edgesDegree[i].target) 
  }
  return [...unsafeNodes]
}


