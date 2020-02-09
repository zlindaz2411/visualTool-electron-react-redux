
import {UnionFind} from './lib/unionFind'
import {ErrMessage} from'../constants/errorMessage'


/**
 * Esau-Williams algorithm that gives a suboptimal solution to the capacitated minimum spanning tree problem.
 * @param {*} capacity 
 * @param {*} graph 
 */
export function esauWilliams(capacity, graph){
    try{
    let root = graph.root;
    let nodes = graph.nodes;
    let uf = new UnionFind(nodes);
    let gates = graph.getAdjacentsOfNode(root.id)
    let CMST = new Set();
    let savings = new Map();
    let components = {};

    //Initialize the components to be vertex-set
    for(let i= 0; i<nodes.length; i++){
        components[nodes[i].id] = new Set([nodes[i].id]);
    }

    //While the edges in the CMST is less than the nodes length -1
    while(CMST.size < nodes.length-1){

        //For each node, set the tradeoff cost with the closest connected node
        for(let i =0; i<nodes.length; i++){
            if(nodes[i].id == root.id) continue;
            else{
                let closest = graph.getAdjacentsOfNode(nodes[i].id).sort((a,b) => a.weight - b.weight)[0]

                //Cannot find a CMST
                if(!closest) throw ErrMessage.CMST_NOT_FOUND
                savings.set(nodes[i], getGateValue(nodes[i].id, gates) - closest.weight);
            }
        }
        //Get the node with the biggest tradeoff
        let max_saving = [...savings.entries()].reduce((a, e) => e[1] > a[1] ? e : a);
        let source = max_saving[0].id
        let edge =  graph.getAdjacentsOfNode(source).sort((a,b) => a.weight - b.weight)[0];
        let target = getConnectedVertex(source, edge)
        
        let u = uf.find(source)
        let v = uf.find(target)
        //Check if two nodes do not form a cycle
        if(u != v){
            let componentCapacity = getComponentCapacity(components[source], components[target]);

            //If the target of the is root, then the component Capacity should be set to less to one 
            //as the CMSTP only constrains the subtree of the root to satisfy the constraint
            let c = target == root.id ? componentCapacity -1 : componentCapacity
            //Check if CMST U (u,v) doesn't violate capacity constraint
            if(c <= capacity){   
                components[source].add(target)
                //If is not root, merge the component of source and target
                if(target != root.id) components[target] = components[source]
                uf.union(source, target)
                CMST.add(edge)
            }
        }
        graph.removeEdge(graph.edges.indexOf(edge))
    }

    return CMST;
    }catch(e){
        return e.toString()
    }
}
    
/**
 * Return the size of the component
 * @param {*} componentA 
 * @param {*} componentB 
 */
function getComponentCapacity(componentA, componentB){
    let set = new Set();
    for (let it = componentA.values(), val= null; val=it.next().value; ) {
        set.add(val)
    }
    for (let it = componentB.values(), val= null; val=it.next().value; ) {
        set.add(val)
    }
    return set.size;
}

/**
 * Return the connected vertex given source or target.
 * @param {*} id 
 * @param {*} edge 
 */
function getConnectedVertex(id, edge){
    if(edge.source == id){
        return edge.target
    }
    return edge.source;
}

/**
 * Return the gate value given a node id. 
 * Gate is the weight of the edge connected from root to the given node
 * @param {*} id 
 * @param {*} gates 
 */
function getGateValue(id, gates){
    for(let i= 0;i<gates.length; i++){
        if(gates[i].source == id || gates[i].target == id){
            return gates[i].weight
        }
    }
    return 0;
}