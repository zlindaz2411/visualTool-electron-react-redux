import {
  getPseudocode,
  setUpPseudocodeMap
} from "../../src/functions/pseudocode";
import { Algorithm } from "../../src/constants/algorithms";

const assert = require("assert");

describe("Get pseudocode based on different input", function() {
  const kruskal = [
    "Sort the edge list E by weight (smallest first)",
    "Initialize the set T = empty set",
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
    "Initialize the set T = empty set",
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
    "Initialize the set T = empty set",
    "Initialize the F = map of one-vertex trees to its component",
    "while(T is not MST)",
    "\xa0 \xa0foreach (component in F)",
    "\xa0 \xa0 \xa0 \xa0 \xa0c = component",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0e = smallest edge for c",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0if(adding e to T is acyclic)",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0Add e to T",
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0else do nothing",
    "return T"
  ];

  it("should return the pseudocode of kruskal algorithm", function() {
    assert.deepEqual(boruvka, getPseudocode(Algorithm.BORUVKA));
  });

  // it('should return the pseudocode of kruskal algorithm', function() {
  //     assert.deepEqual(kruskal,getPseudocode(Algorithm.KRUSKAL));
  //   });

  it("should return an empty with wrong input", function() {
    assert.deepEqual([], getPseudocode("error"));
  });
});

describe("Set up pseucodoe map based on different input", function() {
  const index = 0;

  const kruskalMap = new Map();
  kruskalMap.set("Sort the edge list E by weight (smallest first)", true);
  kruskalMap.set("Initialize the set T = empty set", false);
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
  primMap.set("Initialize the set T = empty set", false);
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
  boruvkaMap.set("Initialize the set T = empty set", true);
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
    "\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0if(adding e to T is acyclic)",
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

  // it("should return true the first line of the pseudocode, and false other lines of pseudocode of kruskal", function() {
  //   assert.deepEqual(kruskal, setUpPseudocodeMap(Algorithm.KRUSKAL));
  // });

  it("should return an empty with wrong input", function() {
    assert.deepEqual(new Map(), setUpPseudocodeMap("error", index));
  });
});
