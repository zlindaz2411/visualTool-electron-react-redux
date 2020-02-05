/**
 * Graph class that stores nodes, edges and the adjacent edges to the nodes
 */
export class Graph{
    constructor() {
        this.root =1
        this.nodes = []
        this.edges = []
        this.adjacents =new Map()
    }

    /**
     * Return the adjacent edges of the node
     * @param {*} id 
     */
    getAdjacentsOfNode(id){
        return this.adjacents.get(id)
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
        this.adjacents.delete(this.nodes[index].id);
        this.nodes.splice(index, 1)
    }

    /**
     * Remove edge by id
     * @param {*} id 
     */
    removeEdge(edgeIndex){ 
        let source = this.adjacents.get(this.edges[edgeIndex].source)
        this.adjacents.set(this.edges[edgeIndex].source, this.removeAdjacent(source, edgeIndex));
        let target = this.adjacents.get(this.edges[edgeIndex].target)
        this.adjacents.set(this.edges[edgeIndex].target, this.removeAdjacent(target, edgeIndex));
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
        if(!this.adjacents.has(node.id)) this.adjacents.set(node.id, []);
     }

     /**
      * Add edge to the graph
      * @param {*} edge 
      */
     addEdge(edge){
        this.edges.push(edge);
        let source = this.adjacents.get(edge.source)
        source.push(edge)
        let target = this.adjacents.get(edge.target)
        target.push(edge)
        this.adjacents.set(edge.source, source)
        this.adjacents.set(edge.target, target)
     }
}