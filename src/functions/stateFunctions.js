/**
 * Add highlighted elements and status in the state list.
 * @param {*} states
 * @param {*} hedge
 * @param {*} tedge
 * @param {*} hnode
 * @param {*} status
 */
export function addStates(states, hedge, tedge, hnode, text, status) {
  states.push({
    highlighted: hedge.slice(),
    tree: tedge.slice(),
    highlightedNodes: hnode.slice(),
    text: text,
    status: status
  });
}

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
 * Update graph: update which edge needs to be highlighted or is a tree
 * @param {*} array 
 * @param {*} tree 
 */
export function updateGraph(array, edges, tree) {
  if(array){
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < edges.length; j++) {
        //check if there is a matching non-highlighted edge
        if (
          (edges[j].source == array[i].source &&
             edges[j].target == array[i].target) ||
          ( edges[j].source == array[i].target &&
             edges[j].target == array[i].source)
        ) {
          if (tree) edges[j].tree = true;
          else  edges[j].highlight = true;
        }
      }
    }
  }
  }
  


    /**
   * Update graph: update which edge needs to be highlighted
   * @param {*} array 
   * @param {*} tree 
   */
 export function updateNodes(array, nodes) {
   if(array){
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        //check if there is a matching non-highlighted edge
        if 
          (nodes[j].id == array[i]) {
          nodes[j].highlight = true;
        }    
      }
      }
    }
  }

