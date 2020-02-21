import {
  getPseudocode,
  setUpPseudocodeMap
} from "../../src/functions/pseudocode";
import { Algorithm } from "../../src/constants/algorithms";

const assert = require("assert");

describe("Get pseudocode based on different input", function() {
  const kruskal = [
    "Sort the edge list E by weight (smallest first)",
    "Initialize the tree T to be empty",
    "for (i=0; i<edgeList.length; i++)",
    "\xa0 \xa0 e = edgelist[i]",
    "\xa0 \xa0 if adding e to T is acyclic",
    "\xa0 \xa0 \xa0\xa0 \xa0add e to T",
    "\xa0 \xa0else do nothing",
    "return T"
  ];

  it("should return the pseudocode of kruskal's algorithm", function() {
    assert.deepEqual(kruskal, getPseudocode(Algorithm.KRUSKAL));
  });

  const prim = [
    "Select a root node r",
    "Initialize the tree T to be empty",
    "Add the edges connected of r to a priority queue Q",
    "while (!Q.isEmpty)",
    "\xa0 \xa0Dequeue the shortest edge (u,v) from the queue",
    "\xa0 \xa0 \xa0 \xa0 \xa0if(u and v are disconnected in T)",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add (u,v) to T",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add to Q new edges connected to u or v",
    "\xa0 \xa0 \xa0 \xa0 \xa0else do nothing",
    "return T"
  ];

  it("should return the pseudocode of prim's algorithm", function() {
    assert.deepEqual(prim, getPseudocode(Algorithm.PRIM));
  });

  const boruvka = [
    "Initialize the tree T to be empty",
    "Initialize the F = map of one-vertex trees to its component",
    "while(T is not MST)",
    "\xa0 \xa0foreach (component in F)",
    "\xa0 \xa0 \xa0 \xa0 \xa0c = component",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0e = smallest edge for c",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0if(e not in T)",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add e to T",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0else do nothing",
    "return T"
  ];

  it("should return the pseudocode of kruskal algorithm", function() {
    assert.deepEqual(boruvka, getPseudocode(Algorithm.BORUVKA));
  });


  const parallel = [
    "Initialize the tree T to be empty",
    "Initialize the F = map of one-vertex trees to its component",
    "while(T is not MST)",
    "\xa0 \xa0foreach (component in F)",
    "\xa0 \xa0 \xa0 \xa0 \xa0create a thread for component",
    "\xa0 \xa0(Concurrent Thread Execution",
    "\xa0 \xa0 \xa0 \xa0 \xa0find the smallest edge for component)",
    "\xa0 \xa0foreach (smallest edge of each component)",
    "\xa0 \xa0 \xa0 \xa0 \xa0if(smallest edge not in T)",
    "\xa0 \xa0 \xa0 \xa0 \xa0\xa0 \xa0 \xa0 \xa0Add smallest edge to T",
    "\xa0 \xa0 \xa0 \xa0 \xa0else do nothing",
    "return T"
  ];

  it("should return the pseudocode of kruskal algorithm", function() {
    assert.deepEqual(parallel, getPseudocode(Algorithm.PARALLEL));
  });

  const esau = [
    "Initialize the tree CMST to be empty",
    "Initialize L = edge list",
    "while(CMST edge list size < node list -1)",
    "\xa0 \xa0foreach (node i in nodeList)",
    "\xa0 \xa0 \xa0 \xa0 \xa0j = closest node to i",
    "\xa0 \xa0 \xa0 \xa0 \xa0tradeoff = cost(i,j) - gate(i,r)",
    "\xa0 \xa0cheapestNode = find node with the lowest tradeoff",
    "\xa0 \xa0cheapestEdge = find cheapest edge adjacent to cheapestNode",
    "\xa0 \xa0if(adding cheapest edge to CMST is acyclic and the subtree to which the endpoints of cheapest belongs to is at most given capacity)",
    "\xa0 \xa0 \xa0 \xa0 \xa0Add cheapestEdge to CMST",
    "\xa0 \xa0remove cheapestEdge from L",
    "return CMST(suboptimal solution)"
  ];

  it("should return the pseudocode of kruskal algorithm", function() {
    assert.deepEqual(esau, getPseudocode(Algorithm.ESAU));
  });

  it("should return an empty with wrong input", function() {
    assert.deepEqual([], getPseudocode("error"));
  });
});

describe("Set up pseucodoe map based on different input", function() {
  const index = 0;

  const kruskalMap = new Map();
  kruskalMap.set("Sort the edge list E by weight (smallest first)", true);
  kruskalMap.set("Initialize the tree T to be empty", false);
  kruskalMap.set("for (i=0; i<edgeList.length; i++)", false);
  kruskalMap.set("\xa0 \xa0 e = edgelist[i]", false);
  kruskalMap.set("\xa0 \xa0 if adding e to T is acyclic", false);
  kruskalMap.set("\xa0 \xa0 \xa0\xa0 \xa0add e to T", false);
  kruskalMap.set("\xa0 \xa0else do nothing", false);
  kruskalMap.set("return T", false);

  it("should return true the first line of the pseudocode, and false other lines of pseudocode of kruskal", function() {
    assert.deepEqual(kruskalMap, setUpPseudocodeMap(Algorithm.KRUSKAL, index));
  });

  const primMap = new Map();
  primMap.set("Select a root node r", true);
  primMap.set("Initialize the tree T to be empty", false);
  primMap.set("Add the edges connected of r to a priority queue Q", false);
  primMap.set("while (!Q.isEmpty)", false);
  primMap.set("\xa0 \xa0Dequeue the shortest edge (u,v) from the queue", false);
  primMap.set(
    "\xa0 \xa0 \xa0 \xa0 \xa0if(u and v are disconnected in T)",
    false
  );
  primMap.set("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add (u,v) to T", false);
  primMap.set(
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add to Q new edges connected to u or v",
    false
  );

  primMap.set("\xa0 \xa0 \xa0 \xa0 \xa0else do nothing", false);
  primMap.set("return T", false);

  it("should return true the first line of the pseudocode, and false other lines of pseudocode of prim", function() {
    assert.deepEqual(primMap, setUpPseudocodeMap(Algorithm.PRIM, index));
  });

  const boruvkaMap = new Map();
  boruvkaMap.set("Initialize the tree T to be empty", true);
  boruvkaMap.set(
    "Initialize the F = map of one-vertex trees to its component",
    false
  );
  boruvkaMap.set("while(T is not MST)", false);
  boruvkaMap.set("\xa0 \xa0foreach (component in F)", false);
  boruvkaMap.set("\xa0 \xa0 \xa0 \xa0 \xa0c = component", false);
  boruvkaMap.set(
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0e = smallest edge for c",
    false
  );
  boruvkaMap.set(
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0if(e not in T)",
    false
  );
  boruvkaMap.set(
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add e to T",
    false
  );
  boruvkaMap.set("\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0else do nothing", false);
  boruvkaMap.set("return T", false);

  it("should return true the first line of the pseudocode, and false other lines of pseudocode of boruvka", function() {
    assert.deepEqual(boruvkaMap, setUpPseudocodeMap(Algorithm.BORUVKA, index));
  });


  it("should return an empty with wrong input", function() {
    assert.deepEqual(new Map(), setUpPseudocodeMap("error", index));
  });

    
  
  const parallelMap = new Map();
  parallelMap.set("Initialize the tree T to be empty", true);
  parallelMap.set(
    "Initialize the F = map of one-vertex trees to its component",
    false
  );
  parallelMap.set("while(T is not MST)", false);
  parallelMap.set("\xa0 \xa0foreach (component in F)", false);
  parallelMap.set("\xa0 \xa0 \xa0 \xa0 \xa0create a thread for component", false);
  parallelMap.set(
    "\xa0 \xa0(Concurrent Thread Execution",
    false
  );
  parallelMap.set(
    "\xa0 \xa0 \xa0 \xa0 \xa0find the smallest edge for component)",
    false
  );
  parallelMap.set(
    "\xa0 \xa0foreach (smallest edge of each component)",
    false
  );
  parallelMap.set("\xa0 \xa0 \xa0 \xa0 \xa0if(smallest edge not in T)", false);
  parallelMap.set("\xa0 \xa0 \xa0 \xa0 \xa0\xa0 \xa0 \xa0 \xa0Add smallest edge to T", false);
  parallelMap.set("\xa0 \xa0 \xa0 \xa0 \xa0else do nothing", false);
  
  parallelMap.set("return T", false);

  it("should return true the first line of the pseudocode, and false other lines of pseudocode of boruvka parallel", function() {
    assert.deepEqual(parallelMap, setUpPseudocodeMap(Algorithm.PARALLEL, index));
  });

  const esauMap = new Map();
  esauMap.set("Initialize the tree CMST to be empty", true);
  esauMap.set(
    "Initialize L = edge list",
    false
  );
  esauMap.set("while(CMST edge list size < node list -1)", false);
  esauMap.set( "\xa0 \xa0foreach (node i in nodeList)", false);
  esauMap.set("\xa0 \xa0 \xa0 \xa0 \xa0j = closest node to i", false);
  esauMap.set(
    "\xa0 \xa0 \xa0 \xa0 \xa0tradeoff = cost(i,j) - gate(i,r)",
    false
  );
  esauMap.set(
    "\xa0 \xa0cheapestNode = find node with the lowest tradeoff",
    false
  );
  esauMap.set(
    "\xa0 \xa0cheapestEdge = find cheapest edge adjacent to cheapestNode",
    false
  );
  esauMap.set("\xa0 \xa0if(adding cheapest edge to CMST is acyclic and the subtree to which the endpoints of cheapest belongs to is at most given capacity)", false);
  esauMap.set("\xa0 \xa0 \xa0 \xa0 \xa0Add cheapestEdge to CMST", false);
  esauMap.set("\xa0 \xa0remove cheapestEdge from L", false);
  
  esauMap.set("return CMST(suboptimal solution)", false);

  it("should return true the first line of the pseudocode, and false other lines of pseudocode of esau williams", function() {
    assert.deepEqual(esauMap, setUpPseudocodeMap(Algorithm.ESAU, index));
  });


  it("should return an empty with wrong input", function() {
    assert.deepEqual(new Map(), setUpPseudocodeMap("error", index));
  });
});
