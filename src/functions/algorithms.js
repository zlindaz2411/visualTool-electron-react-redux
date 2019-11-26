import {UnionFind} from '../functions/lib/unionFind'
import {PriorityQueue} from '../functions/lib/priorityQueue'
// import * as Parallel from 'paralleljs'
/**
 * Kruskals algorithm
 * @param {*} edges 
 * @param {*} nodes 
 */
export function kruskals(nodes, edges) {
    let states = [{highlighted: [], tree: [], status:0}];
    //Sort the edges 
    edges = edges.sort((a,b) => {return a.weight - b.weight;});
    // Initialize graph that'll contain the MST
    let MST = new Set();
    states.push({highlighted: [], tree:[], status:1});

    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for(let i =0;i<edges.length;i++){
        let arr = [states[states.length-1].highlighted.slice()] //a copy of highlighted
        let t = states[states.length-1].tree.slice()
        if(arr.length  == 0) states.push({highlighted: [], tree:[], status:2});
        else states.push({highlighted: arr.slice(), tree:t.slice(), status:2});
        let u = edges[i].source;
        let v = edges[i].target;  
        
        arr.push(edges[i]);
        states.push({highlighted:arr.slice(), tree:t.slice(),status:3})
        //if edges[i] in MST is not acyclic
        states.push({highlighted:arr.slice(), tree:t.slice(),status:4})
        if(!uf.connected(u,v)){
           MST.add(edges[i])
           uf.union(u,v)
           t.push(edges[i])       
           states.push({highlighted:arr.slice(), tree:t.slice(), status:5})
        }
        else{
           arr.pop();
           states.push({highlighted:arr.slice(), tree:t.slice(),  status:6});
        }
        
    }
    
    states.push({highlighted:states[states.length-1].highlighted,tree:states[states.length-1].tree,  status:7});
    return states;
 }


//  /**
//  * Kruskals algorithm
//  * @param {*} edges 
//  * @param {*} nodes 
//  */
// function kruskals(edges, nodes) {
//     //Sort the edges 
//     edges = edges.sort((a,b) => {return a[2] - b[2];});
//     // Initialize graph that'll contain the MST
//     let MST = new Set();
//     let uf = new UnionFind(nodes);
//     // Add all edges to the Queue:
//     for(let i =0;i<edges.length;i++){
//         let u = edges[i][0];
//         let v = edges[i][1];
//         //if edges[i] in MST is not acyclic
//         if(!uf.connected(u,v)){
//            MST.add(edges[i])
//            uf.union(u,v)
//         }
//     }
//     return MST;
//  }


 /**
  * Prim's algorithm
  * @param {*} edges 
  * @param {*} nodes 
  */
 function prims(edges,nodes) {
     
    // Initialize graph that'll contain the MST
    let MST = new Set();
    // Select first node as starting node
    let s = nodes[0];
    // Create a Priority Queue and explored set
    let edgeQueue = new PriorityQueue();
    let explored = new Set();
    explored.add(s);
    let uf = new UnionFind(nodes);
 
    // Add all edges from this starting node to the PQ taking weights as priority
    for(let i=0;i<edges.length;i++){
        if(edges[i][0] == s){
            edgeQueue.enqueue([s, edges[i][1]], edges[i][2]);
        }
        if(edges[i][1] == s){
            edgeQueue.enqueue([s, edges[i][0]], edges[i][2]);
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
            MST.add([u,v,currentMinEdge.priority]);
            uf.union(u,v)
        }
        for(let i=0;i<edges.length;i++){
          if(edges[i][0] == v){
                if(!explored.has(edges[i][1]) && !explored.has(edges[i][1])) edgeQueue.enqueue([v, edges[i][1]], edges[i][2]);
            }
            if(edges[i][1] == v ){
               if(!explored.has(edges[i][0]) && !explored.has(edges[i][0])) edgeQueue.enqueue([v, edges[i][0]], edges[i][2]);
            }
        }
       };
        
    }
    return MST;
 }


//  /**
//   * Prim's algorithm
//   * @param {*} edges 
//   * @param {*} nodes 
//   */
//  function prims(edges,nodes) {
//     // Initialize graph that'll contain the MST
//     let MST = new Set();
//     // Select first node as starting node
//     let s = nodes[0];
//     // Create a Priority Queue and explored set
//     let edgeQueue = new PriorityQueue();
//     let explored = new Set();
//     explored.add(s);
//     let uf = new UnionFind(nodes);
 
//     // Add all edges from this starting node to the PQ taking weights as priority
//     for(let i=0;i<edges.length;i++){
//         if(edges[i][0] == s){
//             edgeQueue.enqueue([s, edges[i][1]], edges[i][2]);
//         }
//         if(edges[i][1] == s){
//             edgeQueue.enqueue([s, edges[i][0]], edges[i][2]);
//         }
//     }
   
//     // Take the smallest edge and add that to the new graph
//     while (!edgeQueue.isEmpty()) {
//        // Continue removing edges till we get an edge with an unexplored node
//        let currentMinEdge = edgeQueue.dequeue();
//        let u = currentMinEdge.element[0]
//        let v =  currentMinEdge.element[1]
//        if(!explored.has(v)){
//         if(!uf.connected(u,v)){
//             explored.add(v);
//             MST.add([u,v,currentMinEdge.priority]);
//             uf.union(u,v)
//         }
//         for(let i=0;i<edges.length;i++){
//           if(edges[i][0] == v){
//                 if(!explored.has(edges[i][1]) && !explored.has(edges[i][1])) edgeQueue.enqueue([v, edges[i][1]], edges[i][2]);
//             }
//             if(edges[i][1] == v ){
//                if(!explored.has(edges[i][0]) && !explored.has(edges[i][0])) edgeQueue.enqueue([v, edges[i][0]], edges[i][2]);
//             }
//         }
//        };
        
//     }
//     return MST;
//  }
 
 /**
  * Boruvka algorithm
  * @param {*} edges 
  * @param {*} nodes 
  */
 function boruvkas(edges, nodes) {
    let subset = new UnionFind(nodes);
    let num = nodes.length;
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let cheapest = [];

    while(num>1){
        //set the cheapest map to -1
        for(let v=0;v<nodes.length;v++){
              cheapest[nodes[v]]= -1;
        }
    
    //for each component check if a weight connected to the component is smaller and set that as cheapest edge
    for(let i =0;i<edges.length;i++){
        let u = subset.find(edges[i][0]);
        let v = subset.find(edges[i][1]);
        if(u==v) continue;
        else{
            if(cheapest[u] == -1 || edges[i][2] < cheapest[u][2]) cheapest[u]=edges[i]
            if(cheapest[v] == -1 || edges[i][2] < cheapest[v][2]) cheapest[v]=edges[i]
        }
    }
    //for each element in cheapest
    for(let i =0;i<V.length;i++){
        let e = cheapest[nodes[i]];
        //check if it's null
        if(e!=-1){
            let u = subset.find(e[0]);
            let v = subset.find(e[1]);
            if(u==v) continue;
            //check if adding edge to mst is acyclic
            if(!subset.connected(u,v)){
                MST.add(cheapest[V[i]]);
                subset.union(u,v);
                num--; //decrease the number of vertices
            }
        }
    }
}
    return MST  

}

export function test(){
    // var p = new Parallel([1, 2, 3, 4, 5]);
    // console.log(p.data)
}

function parallel(edges, nodes) {
    let subset = new UnionFind(nodes);
    let num = nodes.length;
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let cheapest = [];

    while(num>1){
        //set the cheapest map to -1
        for(let v=0;v<nodes.length;v++){
              cheapest[nodes[v]]= -1;
        }
    
    //for each component check if a weight connected to the component is smaller and set that as cheapest edge
    for(let i =0;i<edges.length;i++){
        let u = subset.find(edges[i][0]);
        let v = subset.find(edges[i][1]);
        if(u==v) continue;
        else{
            if(cheapest[u] == -1 || edges[i][2] < cheapest[u][2]) cheapest[u]=edges[i]
            if(cheapest[v] == -1 || edges[i][2] < cheapest[v][2]) cheapest[v]=edges[i]
        }
    }
    //for each element in cheapest
    for(let i =0;i<V.length;i++){
        let e = cheapest[nodes[i]];
        //check if it's null
        if(e!=-1){
            let u = subset.find(e[0]);
            let v = subset.find(e[1]);
            if(u==v) continue;
            //check if adding edge to mst is acyclic
            if(!subset.connected(u,v)){
                MST.add(cheapest[V[i]]);
                subset.union(u,v);
                num--; //decrease the number of vertices
            }
        }
    }
}
    return MST  
}
