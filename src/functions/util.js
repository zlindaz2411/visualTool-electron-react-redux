/**
 * Get the sum of the weights of a path
 * @param {*} path 
 */
export function getWeight(path){
    let weight = 0;
    for(let i= 0;i<path.length; i++){
      weight +=path[i].weight
    }
    return weight
  }