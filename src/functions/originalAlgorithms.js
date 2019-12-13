import {UnionFind} from '../functions/lib/unionFind'
import {PriorityQueue} from '../functions/lib/priorityQueue'
import {ErrMessage} from'../constants/errorMessage'

 /**
 * Kruskals algorithm
 * @param {*} edges 
 * @param {*} nodes 
 */
export function kruskals(nodes, edges) {
    try{
    //Sort the edges 
    edges = edges.sort((a,b) => {return a.weight - b.weight;});
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let uf = new UnionFind(nodes);
    let check = new Set();
    // Add all edges to the Queue:
    for(let i =0;i<edges.length;i++){
        let u = edges[i].source;
        let v = edges[i].target;
        //if edges[i] in MST is not acyclic
        if(!uf.connected(u,v)){
           MST.add(edges[i])
           check.add(u);
           check.add(v);
           uf.union(u,v)
        }
    }
    
    //check if is a minimum spanning tree
    if(check.size != nodes.length){
        throw ErrMessage.MST_NOT_FOUND
    }
    return MST;
    }
    catch(error){
        return error.toString();
    }
 }
 



 /**
  * Prim's algorithm
  * @param {*} edges 
  * @param {*} nodes 
  */
 export function prims(nodes, edges) {
    try{
    // Initialize graph that'll contain the MST
    let MST = new Set();
    // Select first node as starting node
    let s = nodes[0];
    let check = new Set();
    // Create a Priority Queue and explored set
    let edgeQueue = new PriorityQueue();
    let explored = new Set();
    explored.add(s.id);
    let uf = new UnionFind(nodes);
 
    // Add all edges from this starting node to the PQ taking weights as priority
    for(let i=0;i<edges.length;i++){
        if(edges[i].source == s.id){
            edgeQueue.enqueue([s.id, edges[i].target], edges[i].weight)
        }
        if(edges[i].target == s.id){
            edgeQueue.enqueue([s.id, edges[i].source], edges[i].weight);
        }
    }
   
    // Take the smallest edge and add that to the new graph
    while (!edgeQueue.isEmpty()) {
       // Continue removing edges till we get an edge with an unexplored node
       let currentMinEdge = edgeQueue.dequeue();
       let u = currentMinEdge.element[0]
       let v =  currentMinEdge.element[1]
       if(!explored.has(v)){
        if(!uf.connected(u,v)){
            explored.add(v);
            check.add(u);
            check.add(v);
            MST.add([u,v,currentMinEdge.priority]);
            uf.union(u,v)
        }
        for(let i=0;i<edges.length;i++){
          if(edges[i].source== v){
                if(!explored.has(edges[i].target) && !explored.has(edges[i].target)) edgeQueue.enqueue([v, edges[i].target], edges[i].weight);
            }
            if(edges[i].target == v ){
               if(!explored.has(edges[i].source) && !explored.has(edges[i].source)) edgeQueue.enqueue([v, edges[i].source], edges[i].weight);
            }
        }
       };
        
    }

    //check if is a minimum spanning tree
    if(check.size != nodes.length){
        throw ErrMessage.MST_NOT_FOUND
    }
    return MST;
    }
    catch(error){
        return error.toString();
    }
 }

  /**
  * Boruvka algorithm
  * @param {*} edges 
  * @param {*} nodes 
  */
 export function boruvkas(nodes,edges) {
    let subset = new UnionFind(nodes);
    let num = nodes.length;
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let cheapest = [];
    while(num>1){
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
    for(let i =0;i<nodes.length;i++){
        let e = cheapest[nodes[i].id];
        if(e!=-1){
            let u = subset.find(e.source);
            let v = subset.find(e.target);
            if(u==v) continue;
            if(!subset.connected(u,v)){
                MST.add(e);
                subset.union(u,v);
                num--;
            }
        }
    }
}
    return MST  

}

  /**
  * Boruvka Parallel algorithm
  * @param {*} edges 
  * @param {*} nodes 
  */
export function parallel(nodes,edges) {
    let subset = new UnionFind(nodes);
    let num = nodes.length;
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let cheapest = [];
    while(num>1){
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
    for(let i =0;i<nodes.length;i++){
        let e = cheapest[nodes[i].id];
        if(e!=-1){
            let u = subset.find(e.source);
            let v = subset.find(e.target);
            if(u==v) continue;
            if(!subset.connected(u,v)){
                MST.add(e);
                subset.union(u,v);
                num--;
            }
        }
    }
}
    return MST  

}