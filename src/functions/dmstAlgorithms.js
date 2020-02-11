
import {UnionFind} from './lib/unionFind'
import {ErrMessage} from'../constants/errorMessage'

function kruskalConstrained(graph, degree) {
    try{
    //Sort the edges 
    let nodes = graph.nodes
    let degrees = {}
    
    for(let i= 0;i<nodes.length;i++){
        degrees[nodes[i].id] = 0;
    }
    let edges = graph.edges.sort((a,b) => {return a.weight - b.weight;});
    // Initialize graph that'll contain the MST
    let MST = new Set();
    let uf = new UnionFind(nodes);
    // Add all edges to the Queue:
    for(let i =0;i<edges.length;i++){
        let u = edges[i].source;
        let v = edges[i].target;
        //if edges[i] in MST is not acyclic
        if(!uf.connected(u,v) && degrees[u]+1 <= degree && degrees[v]+1 <= degree){
           MST.add(edges[i])
           degrees[u] +=1;
           degrees[v] +=1;
           uf.union(u,v)
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
 
