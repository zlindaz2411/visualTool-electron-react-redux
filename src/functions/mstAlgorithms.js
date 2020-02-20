import {UnionFind} from './lib/unionFind'
import {PriorityQueueHeap} from './lib/priorityQueue'
import {ErrMessage} from'../constants/errorMessage'

 /**
 * Kruskals algorithm
 * @param {*} edges 
 * @param {*} nodes 
 */
export function kruskals(graph) {
    try{
    //Sort the edges 
    let nodes = graph.nodes
    let edges = graph.edges.sort((a,b) => {return a.weight - b.weight;});
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for(let i =0;i<edges.length;i++){
        let u = edges[i].source;
        let v = edges[i].target;
        //if edges[i] in MST is not acyclic
        if(!uf.connected(u,v)){
           MST.add(edges[i])
           uf.union(u,v)
           if(MST.size == nodes.length-1){
               return MST;
           }
        }
    }
    
    //check if is a minimum spanning tree
    if(MST.size != nodes.length-1){
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
 export function prims(graph) {
    try{
    // Initialize graph that'll contain the MST
    let nodes = graph.nodes
    let edges = graph.edges
    let MST = new Set();
    // Select first node as starting node
    let s = nodes[0];
    // Create a Priority Queue and explored set
    let edgeQueue = new PriorityQueueHeap();
    let explored = new Set();
    explored.add(s.id);
 
    // Add all edges from this starting node to the PQ taking weights as priority
    let adjacents = graph.getAdjacentsOfNode(s.id);
    for (let i = 0; i < adjacents.length; i++) {
      if (adjacents[i].source != s.id)
        edgeQueue.insert([s.id, adjacents[i].source], adjacents[i].weight);
      if (adjacents[i].target != s.id)
        edgeQueue.insert([s.id, adjacents[i].target], adjacents[i].weight);
    }

    // Take the smallest edge and add that to the new graph
    while (!edgeQueue.isEmpty()) {
       // Continue removing edges till we get an edge with an unexplored node
       let currentMinEdge = edgeQueue.extractMin();
       let u = currentMinEdge.element[0]
       let v =  currentMinEdge.element[1]
       if(!explored.has(v)){
            explored.add(v);
            MST.add([u,v,currentMinEdge.priority]);
            let adjacents = graph.getAdjacentsOfNode(v)
        for (let i = 0; i < adjacents.length; i++) {
            //Check if the endpoints has been explored, if not, add to MST and add to the priority queue the adjacent edges
          if (adjacents[i].source != v) {
            if (!explored.has(adjacents[i].source)) {
              edgeQueue.insert(
                [v, adjacents[i].source],
                adjacents[i].weight
              );
            }
          }
          if (adjacents[i].target != v) {
            if (!explored.has(adjacents[i].target)) {
              edgeQueue.insert(
                [v, adjacents[i].target],
                adjacents[i].weight
              );
            }
          }
        }
       };
    }

    //check if is a minimum spanning tree
    if(explored.size != nodes.length){
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
 export function boruvkas(graph) {
     try{
        let nodes = graph.nodes
        let edges = graph.edges
    let subset = new UnionFind(nodes);
    let num = nodes.length;
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let cheapest = [];
    let previous = 0;
    let current = num;
    while(num>1){
        previous = current;

        //Initialize the cheapest list to be -1
        for(let v=0;v<nodes.length;v++){
              cheapest[nodes[v].id]= -1;
        }
        
        //For each component find the cheapest edge
        for(let i =0;i<edges.length;i++){
            let u = subset.find(edges[i].source);
            let v = subset.find(edges[i].target);
            if(u==v) continue; 
            else{
                if(cheapest[u] == -1 || edges[i].weight < cheapest[u].weight) cheapest[u]=edges[i]
                if(cheapest[v] == -1 || edges[i].weight < cheapest[v].weight) cheapest[v]=edges[i]
            }
        }
        //For each cheapest edge, check if they belong to the same component, if yes add to the MST
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
    current = num;
    //If the number of component has not changed
    if(current == previous) throw ErrMessage.MST_NOT_FOUND;
    }
    return MST  
}catch(error){
    return error.toString();
}
}

  /**
  * Boruvka Parallel algorithm
  * @param {*} edges 
  * @param {*} nodes 
  */
 export async function parallel(graph) {
    try{
        let nodes = graph.nodes
         let edges = graph.edges
        let subset = new UnionFind(nodes);
        let num = nodes.length;
        // Initialize graph that'll contain the MST
        let MST = new Set();
        let cheapest = [];
        let previous = 0;
        let current = num;
        while(num>1){
            previous = current;

            //Initialize the cheapest list to be -1
            for(let v=0;v<nodes.length;v++){
                    cheapest[nodes[v].id]= -1;
            }

        //Let promises to handle the selection of hte cheapest edge(alternative of threads for Javascript)
        let promises = edges.map(async (edge) =>  {await findCheapest(edge, subset, cheapest)})
        let result = await Promise.all(promises)
           
    
        //For each cheapest edge, check if they belong to the same component, if yes add to the MST
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
        current = num;
        //If the number of component has not changed
        if(current == previous) throw "MST not found";
        }
        return MST  
        }catch(error){
        return error.toString();
        }
}
/**
 * Find cheapest edge of the vertex. 
 * @param {*} edge 
 * @param {*} subset 
 * @param {*} cheapest 
 */
function findCheapest(edge, subset, cheapest){
    return new Promise(resolve => {
    setTimeout(() => {
           let u = subset.find(edge.source);
           let v = subset.find(edge.target);
           if(u!=v) {
               if(cheapest[u] == -1 || edge.weight < cheapest[u].weight) cheapest[u]=edge
               if(cheapest[v] == -1 || edge.weight < cheapest[v].weight) cheapest[v]=edge
           }
           resolve(edge);
       },);    
   })
}