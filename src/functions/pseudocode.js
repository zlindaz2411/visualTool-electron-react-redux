
import {Algorithm} from '../constants/algorithms'
/**
 * Get the pseudocode based on the name of the algorithm
 * @param {*} name 
 */
export function getPseudocode(name) {
    switch (name) {
      case Algorithm.KRUSKAL: //Kruskal's
        let kruskal = [];
        kruskal.push("Sort the edge list E by weight (smallest first)");
        kruskal.push("Initialize the tree T to be empty");
        kruskal.push("for (i=0; i<edgeList.length; i++)");
        kruskal.push("\xa0 \xa0 e = edgelist[i]");
        kruskal.push("\xa0 \xa0 if adding e to T is acyclic");
        kruskal.push("\xa0 \xa0 \xa0\xa0 \xa0add e to T");
        kruskal.push("\xa0 \xa0else do nothing");
        kruskal.push("return T");
        return kruskal;
      case Algorithm.CONSTRAINED: //Kruskal for DCMST
        //let kruskalConstrained = [];
        // kruskalConstrained.push("Initialize the tree T to be empty");
        // kruskalConstrained.push("Initialize the list U = nodes with degree -1 > constraint");
        // kruskalConstrained.push("Sort the edge list E by weight (smallest first) and remove edges adjacents to unsafe nodes");
        // kruskalConstrained.push("for (i=0; i<edgeList.length; i++)");
        // kruskalConstrained.push("\xa0 \xa0 e = edgelist[i]");
        // kruskalConstrained.push("\xa0 \xa0 if adding e to T is acyclic and does not violate degree constraint");
        // kruskalConstrained.push("\xa0 \xa0 \xa0\xa0 \xa0add e to T");
        // kruskalConstrained.push("for (i=0; i<U.length; i++)");
        // kruskalConstrained.push("\xa0 \xa0 adjacents = sorted adjacents edges of U[i]");
        // kruskalConstrained.push("\xa0 \xa0 \xa0\xa0 \xa0for each adjacent in adjacents");
        // kruskalConstrained.push("\xa0 \xa0 \xa0 \xa0 \xa0\xa0 \xa0if adding adjacent to T is acyclic and does not violate degree constraint");
        // kruskalConstrained.push("\xa0 \xa0 \xa0\xa0 \xa0\xa0 \xa0 \xa0\xa0 \xa0add adjacent to T");
        // kruskalConstrained.push("While there is still optimization");
        // kruskalConstrained.push("\xa0 \xa02-opt");
        // kruskalConstrained.push("return T");
        let kruskalConstrained = [];
        kruskalConstrained.push("Initialize the tree T to be empty");
        kruskalConstrained.push("Add to the tree edges adjacent to nodes with degree 1");
        kruskalConstrained.push("For each node k with degree 2");
        kruskalConstrained.push("\xa0 \xa0 i, j = endpoint of edges adjacent to k");
        kruskalConstrained.push("\xa0 \xa0 \xa0 \xa0\xa0if(there isn't a path between i and j (apart from the one with k))");
        kruskalConstrained.push("\xa0 \xa0 \xa0 \xa0\xa0 \xa0\xa0Add adjacent edges of k to T");
        kruskalConstrained.push("Sort the edge list E by weight (smallest first)");
        kruskalConstrained.push("for (i=0; i<edgeList.length; i++)");
        kruskalConstrained.push("\xa0 \xa0 e = edgelist[i]");
        kruskalConstrained.push("\xa0 \xa0 if adding e to T is acyclic and does not violate degree constraint");
        kruskalConstrained.push("\xa0 \xa0 \xa0\xa0 \xa0add e to T");
        kruskalConstrained.push("While there is still optimization");
        kruskalConstrained.push("\xa0 \xa02-opt");
        kruskalConstrained.push("return T");
        return kruskalConstrained;
      case Algorithm.PRIM: //Prim's
        let prim = [];
        prim.push("Select a root node r");
        prim.push("Initialize the tree T to be empty");
        prim.push("Add the edges connected of r to a priority queue Q");
        prim.push("while (!Q.isEmpty)");
        prim.push("\xa0 \xa0Dequeue the shortest edge (u,v) from the queue");
        prim.push("\xa0 \xa0 \xa0 \xa0 \xa0if(u and v are disconnected in T)");
        prim.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add (u,v) to T");
        prim.push(
          "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add to Q new edges connected to u or v"
        );
        prim.push("\xa0 \xa0 \xa0 \xa0 \xa0else do nothing");
        prim.push("return T");
        return prim;
      case Algorithm.BORUVKA: //Borvska's
        let boruvka = [];
        boruvka.push("Initialize the tree T to be empty");
        boruvka.push("Initialize the F = map of one-vertex trees to its component");
        boruvka.push("while(T is not MST)");
        boruvka.push(
          "\xa0 \xa0foreach (component in F)"
        );
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0c = component");
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0e = smallest edge for c");
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0if(e not in T)");
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add e to T");
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0else do nothing");
        boruvka.push("return T");
        return boruvka;
      case Algorithm.PARALLEL: // Parallel Boruvska
        let boruvkaParallel = [];
        boruvkaParallel.push("Initialize the tree T to be empty");
        boruvkaParallel.push("Initialize the F = map of one-vertex trees to its component");
        boruvkaParallel.push("while(T is not MST)");
        boruvkaParallel.push(
          "\xa0 \xa0foreach (component in F)"
        );
        boruvkaParallel.push("\xa0 \xa0 \xa0 \xa0 \xa0create a thread for component");
        boruvkaParallel.push("\xa0 \xa0(Concurrent Thread Execution");
        boruvkaParallel.push("\xa0 \xa0 \xa0 \xa0 \xa0find the smallest edge for component)");
        boruvkaParallel.push("\xa0 \xa0foreach (smallest edge of each component)");
        boruvkaParallel.push("\xa0 \xa0 \xa0 \xa0 \xa0if(smallest edge not in T)");
        boruvkaParallel.push("\xa0 \xa0 \xa0 \xa0 \xa0\xa0 \xa0 \xa0 \xa0Add smallest edge to T");
        boruvkaParallel.push("\xa0 \xa0 \xa0 \xa0 \xa0else do nothing");
        boruvkaParallel.push("return T");

        return boruvkaParallel;
        case Algorithm.ESAU: // Esau Wiliams pseudocode
        let esauWilliams = [];
        esauWilliams.push("Initialize the tree CMST to be empty");
        esauWilliams.push("Initialize L = edge list");
        esauWilliams.push("while(CMST edge list size < node list -1)");
        esauWilliams.push(
          "\xa0 \xa0foreach (node i in nodeList)"
        );
        esauWilliams.push("\xa0 \xa0 \xa0 \xa0 \xa0j = closest node to i");
        esauWilliams.push("\xa0 \xa0 \xa0 \xa0 \xa0tradeoff = cost(i,j) - gate(i,r)");
        esauWilliams.push("\xa0 \xa0cheapestNode = find node with the lowest tradeoff");
        esauWilliams.push("\xa0 \xa0cheapestEdge = find cheapest edge adjacent to cheapestNode");
        esauWilliams.push("\xa0 \xa0if(adding cheapest edge to CMST is acyclic and the subtree to which the endpoints of cheapest belongs to is at most given capacity)");
        esauWilliams.push("\xa0 \xa0 \xa0 \xa0 \xa0Add cheapestEdge to CMST");
        esauWilliams.push("\xa0 \xa0remove cheapestEdge from L");
        esauWilliams.push("return CMST(suboptimal solution)");

        return esauWilliams;
        case Algorithm.SIMULATED:
          let simulated = [];
          simulated.push("Initialize the tree DCMST to be empty");
          simulated.push("Initialize the tree MST by computing any MST algorithms");
          simulated.push("While k_level < k_max(5000)");
          simulated.push("\xa0 \xa0 Remove one edge from MST");
          simulated.push("\xa0 \xa0 Add an random edge connecting the MST from the original graph to MST");
          simulated.push("\xa0 \xa0 if(new MST does not violate degree constraint and has smaller weight)");
          simulated.push("\xa0 \xa0 \xa0 \xa0\xa0 DCMST = new MST");
          simulated.push("\xa0 \xa0 k_level +=1");
          simulated.push("return DCMST");
          return simulated
      default:
        return [];
    }
  }

export function setUpPseudocodeMap(name, index){
  let pseudocodeMap = new Map();
  let pseudocodes = getPseudocode(name);
  for (let i = 0; i < pseudocodes.length; i++) {
    if (i == index) pseudocodeMap.set(pseudocodes[i], true);
    else pseudocodeMap.set(pseudocodes[i], false);
  }
  return pseudocodeMap;
}