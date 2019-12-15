/**Pseudocode of Kruskal's, Prim's, Borvska's and Borvska Parallel algorithm */
export function getPseudocode(name) {
    switch (name) {
      case "Kruskal": //Kruskal's
        let kruskal = [];
        kruskal.push("Sort the edge list E by weight (smallest first)");
        kruskal.push("Initialize the set T = empty set");
        kruskal.push("for (i=0; i<edgeList.length; i++)");
        kruskal.push("\xa0 \xa0 e = edgelist[i]");
        kruskal.push("\xa0 \xa0 if adding e to T is acyclic");
        kruskal.push("\xa0 \xa0 \xa0\xa0 \xa0add e to T");
        kruskal.push("\xa0 \xa0else do nothing");
        kruskal.push("return T");
        return kruskal;
      case "Prim": //Prim's
        let prim = [];
        prim.push("Select a root node r");
        prim.push("Initialize the set T = empty set");
        prim.push("Add the edges connected of r to a priority queue Q");
        prim.push("while (!Q.isEmpty)");
        prim.push("\xa0 \xa0Dequeue the shortest edge (u,v) from the queue ");
        prim.push("\xa0 \xa0 \xa0 \xa0 \xa0if(u and v are disconnected in T)");
        prim.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add (u,v) to T");
        prim.push(
          "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add to Q new edges connected to u or v"
        );
        prim.push("\xa0 \xa0 \xa0 \xa0 \xa0else do nothing;");
        prim.push("return T");
        return prim;
      case "Boruvka": //Borvska's
        let boruvka = [];
        boruvka.push("Initialize the set T = empty set");
        boruvka.push("Initialize the F = map of one-vertex trees to its component");
        boruvka.push("while(T is not MST)");
        boruvka.push(
          "\xa0 \xa0foreach (component in F)"
        );
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0c = component");
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0e = smallest edge for c");
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0if(adding e to T is acyclic)");
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add e to T");
        boruvka.push("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0else do nothing");
        boruvka.push("return T");
        return boruvka;
      case "Boruvka Parallel": // Parallel Boruvska
        let boruvkaParallel = [];
        boruvkaParallel.push("Initialize the set V = vertices");
        boruvkaParallel.push("Initialize the set T = empty set");

        return boruvkaParallel;
        break;
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