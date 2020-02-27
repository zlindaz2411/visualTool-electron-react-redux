/**
 * Get the sum of the weights of a path
 * @param {*} path 
 */
export function getWeight(path){
    let weight = 0;
    for(let i= 0;i<path.length; i++){
      weight += path[i].weight
    }
    return weight
  }

/**
 * Breadth first search to check if all the nodes of the graph are connected
 * @param {*} nodes 
 * @param {*} edges 
 */
export function isConnected(nodes, edges){
  let queue = [nodes[0].id];
  let visited = {};
  for (let i = 0; i < nodes.length; i++) {
    visited[nodes[i].id] = false;
  }
  while(queue.length !=0){
    let u = queue.shift()
    if(!visited[u]){
        visited[u] = true
        let adjacents = findAdjancentsVertices(u, edges)
        for(let j =0;j<adjacents.length; j++){
          if(!visited[adjacents[j]]) queue.push(adjacents[j])
        }
    }
    
  }
  for(const [key, value] of Object.entries(visited)){
    if(!value) return false;
  }
  return true;
}

/**
 * Find vertices of the adjacents edges to a node
 * @param {*} node 
 * @param {*} edges 
 */
function findAdjancentsVertices(node, edges){
  let adjacents = new Set();
  for(let i =0;i<edges.length;i++){
    if(edges[i].source == node){
      adjacents.add(edges[i].target)
    } 
    if(edges[i].target == node){
      adjacents.add(edges[i].source)
    }
  }
  return Array.from(adjacents)
}