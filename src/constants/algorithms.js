import UnionFind from 'lib/unionFind';
import PriorityQueue from 'lib/priorityQueue'

 function kruskals(edgeList, nodes) {
    let edges = edgeList.sort((a,b) => {return a[2] - b[2];});
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for(let i =0;i<edges.length;i++){
        let u = edges[i][0];
        let v = edges[i][1];
        if(!uf.connected(u,v)){
           MST.add(edges[i])
           uf.union(u,v)
        }
    }
    return MST;
 }


 function prims(edgeList,nodes) {
    // Initialize graph that'll contain the MST
    let MST = new Set();
    // Select first node as starting node
    let s = nodes[0];
    let edges = edgelist;
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
       // COntinue removing edges till we get an edge with an unexplored node
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

 