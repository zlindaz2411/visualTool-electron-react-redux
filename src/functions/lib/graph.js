/**
 * Graph class that stores nodes, edges and the adjacent edges to the nodes
 */
export class Graph{
    constructor(root = 1, nodes = [], edges = [], adjacents = {}) {
        this.root =root
        this.nodes = nodes;
        this.edges = edges;
        this.adjacents = adjacents;
    }

    /**
     * Return the adjacent edges of the node
     * @param {*} id 
     */
    getAdjacentsOfNode(id){
        return this.adjacents[id]
    }

    /**
     * Remove node by index
     * @param {*} id 
     */
    removeNode(index){
       
        for(let i =0;i<this.edges.length;i++){
            if(this.edges[i].source == this.nodes[index].id){
                this.removeEdge(i);
                i--;
            }
            else if(this.edges[i].target == this.nodes[index].id){
                this.removeEdge(i);
                i--
            }
        }
        delete this.adjacents[this.nodes[index].id];
        this.nodes.splice(index, 1)
    }

    /**
     * Remove edge by id
     * @param {*} id 
     */
    removeEdge(edgeIndex){ 
        let source = this.adjacents[this.edges[edgeIndex].source]
        this.adjacents[this.edges[edgeIndex].source] =  this.removeAdjacent(source, edgeIndex)
        let target = this.adjacents[this.edges[edgeIndex].target]
        this.adjacents[this.edges[edgeIndex].target] =  this.removeAdjacent(target, edgeIndex);
        this.edges.splice(edgeIndex, 1)
    }

   /**
    * Remove adjacent edges of the node
    * @param {*} source 
    * @param {*} edgeIndex 
    */
    removeAdjacent(source, edgeIndex){
        for(let i= 0;i<source.length; i++){
            if(source[i].source == this.edges[edgeIndex].source && source[i].target == this.edges[edgeIndex].target) {
                source.splice(i,1)
                i--;
            }else if(source[i].source == this.edges[edgeIndex].target && source[i].target == this.edges[edgeIndex].source) {
                source.splice(i,1)
                i--;
            }
        }
        return source;
    }

     /**
      * Add node to the graph
      * @param {*} node 
      */
     addNode(node){
        this.nodes.push(node);
        this.adjacents[node.id] =  [];
     }

     /**
      * Add edge to the graph
      * @param {*} edge 
      */
     addEdge(edge){
        this.edges.push(edge);
        let source = this.adjacents[edge.source]
        source.push(edge)
        let target = this.adjacents[edge.target]
        target.push(edge)
        this.adjacents[edge.source] = source
        this.adjacents[edge.target] = target
     }
}