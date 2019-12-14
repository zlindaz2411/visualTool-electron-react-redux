/**
   * Reset data ui to original value (tree = false)
   */
  export function resetTree(edges){
    for (let i = 0; i < edges.length; i++) {
      edges[i].tree = false;
    }
  }

  /**
   * Reset data ui to original value (highlight = false)
   */
 export function resetHighlight(edges){
    for (let i = 0; i < edges.length; i++) {
      edges[i].highlight = false;
    }
  }

  /**
   * Reset data ui to original value (highlight = false)
   */
 export function resetRoot(data){
    data.root = {}
}

  /**
   * Reset data ui to original value (highlight = false)
   */
  export function resetNodes(nodes){
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].highlight = false;
    }
  }

/**
   * Update graph: update which edge needs to be highlighted
   * @param {*} array 
   * @param {*} tree 
   */
export function updateGraph(array, edges, tree) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < edges.length; j++) {
        //check if there is a matching non-highlighted edge
        if (
          (edges[j].source == array[i].source &&
             edges[j].target == array[i].target) ||
          ( edges[j].source == array[i].target &&
             edges[j].target == array[i].source)
        ) {
          if (tree)  edges[j].tree = true;
          else  edges[j].highlight = true;
          // removeAll();
          // drawGraph(this.state.data, false);
        } else {
          edges[j].highlight = false;
          // removeAll();
          // drawGraph(this.state.data, false);
        }
      }
    }
  }
