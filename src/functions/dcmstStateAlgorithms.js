import { UnionFind } from "./lib/unionFind";
import { ErrMessage } from "../constants/errorMessage";
import { addStates } from "./stateFunctions";
import { getWeight, isConnected, two_opt } from "../functions/util";
import { kruskals } from "./mstAlgorithms";
import {
  checkNoPath,
  getOtherEndPoint,
  getComponentsEdge,
  getDegree,
  isDegreeViolated,
  generateNeighbourhood,
  getViolated,
  costFunction
} from "./dcmstAlgorithms";

/**
 * Modified version of kruskal algorithm to find approximate solution for DCMSTP
 * @param {*} graph
 * @param {*} degree
 */
export function kruskalConstrained(graph, degree) {
  try {
    let DCMST = [];
    let totalDegree = new Map();
    let nodes = graph.nodes;
    let edges = graph.edges.slice();
    let degrees = {};
    let uf = new UnionFind(nodes);
    for (let i = 0; i < nodes.length; i++) {
      degrees[nodes[i].id] = 0;
    }

    let states = [{ highlighted: [], tree: [], text: "", status: 0 }];
    for (let i = 0; i < nodes.length; i++) {
      let adjacents = graph.getAdjacentsOfNode(nodes[i].id);
      if (!totalDegree.has(adjacents.length)) {
        totalDegree.set(adjacents.length, [nodes[i].id]);
      } else {
        let temp = totalDegree.get(adjacents.length);
        temp.push(nodes[i].id);
        totalDegree.set(adjacents.length, temp);
      }
    }

    let t = [];

    let nodeWithDegreeOne = totalDegree.get(1);
    if (nodeWithDegreeOne) {
      for (let j = 0; j < nodeWithDegreeOne.length; j++) {
        let degreeOne = graph.getAdjacentsOfNode(nodeWithDegreeOne[j])[0];
        DCMST.push(degreeOne);
        t.push(degreeOne);
        edges.splice(edges.indexOf(degreeOne), 1);
        uf.union(degreeOne.source, degreeOne.target);
        degrees[degreeOne.source] += 1;
        degrees[degreeOne.target] += 1;
      }
    }
    addStates(states, [], t, [], "", 1);

    let nodeWithDegreeTwo = totalDegree.get(2);
    if (nodeWithDegreeTwo) {
      for (let j = 0; j < nodeWithDegreeTwo.length; j++) {
        let hnode = [];
        hnode.push(nodeWithDegreeTwo[j]);
        addStates(states, [], t, hnode, "", 2);
        let adjacents = graph.getAdjacentsOfNode(nodeWithDegreeTwo[j]);
        let v = getOtherEndPoint(adjacents[0], nodeWithDegreeTwo[j]);
        let u = getOtherEndPoint(adjacents[1], nodeWithDegreeTwo[j]);
        hnode.push(v);
        hnode.push(u);

        addStates(states, adjacents, t, hnode, "", 3);
        addStates(states, adjacents, t, hnode, "", 4);
        if (checkNoPath(v, u, graph)) {
          DCMST = DCMST.concat(adjacents);
          uf.union(u, v);
          edges.splice(edges.indexOf(adjacents[0]), 1);
          edges.splice(edges.indexOf(adjacents[1]), 1);
          degrees[u] += 1;
          degrees[v] += 1;
          t = t.concat(adjacents);
          degrees[nodeWithDegreeTwo[j]] += 2;
          addStates(states, [], t, hnode, "", 5);
        }
      }
    }

    addStates(states, [], t, [], "", 6);
    edges = edges.sort((a, b) => a.weight - b.weight);
    for (let i = 0; i < edges.length; i++) {
      addStates(states, [], t, [], "", 7);
      let u = edges[i].source;
      let v = edges[i].target;
      addStates(states, [edges[i]], t, [], "", 8);
      addStates(states, [edges[i]], t, [], "", 9);
      if (
        !uf.connected(u, v) &&
        degrees[u] + 1 <= degree &&
        degrees[v] + 1 <= degree
      ) {
        DCMST.push(edges[i]);
        degrees[u] += 1;
        degrees[v] += 1;
        t.push(edges[i]);
        uf.union(u, v);
        addStates(states, [], t, [], "", 10);
        if (DCMST.length == nodes.length - 1) {
          let times = two_opt(DCMST, graph, states);
          addStates(
            states,
            [],
            t,
            [],
            "Performed " + times + " 2-opt optimizations",
            13
          );
          return states;
        }
      }
    }

    let times = two_opt(DCMST, graph, states);
    if (DCMST.length != nodes.length - 1) throw ErrMessage.DCMST_NOT_FOUND;
    addStates(
      states,
      [],
      t,
      [],
      "Performed " + times + " 2-opt optimizations",
      13
    );
    return states;
  } catch (e) {
    return e.toString();
  }
}

/**
 * Simulated Annealing gives approximate solution to the degree constrained minimum spanning tree
 * @param {*} graph
 * @param {*} degree
 */
export function simulatedAnnealing(graph, degree) {
  try {
    let MST = kruskals(graph);
    if (MST == ErrMessage.MST_NOT_FOUND) throw ErrMessage.DCMST_NOT_FOUND;
    let states = [{ highlighted: MST.slice(), tree: [], text: "", status: 0 }];
    let K_LEVEL = 0;
    let DCMST = [];
    let alpha = 0.9;
    let TEMP_RANGE = 5000;
    let MAX_TEMP_LEVEL = 1000;
    let weight = Number.MAX_SAFE_INTEGER;
    while (K_LEVEL < MAX_TEMP_LEVEL) {
      addStates(states, MST.slice(), [], [], "", 1);

      let oldMST = MST.slice();
      generateNeighbourhood(MST, graph, function() {
        addStates(
          states,
          MST.slice(),
          [],
          [],
          "Neighbourhood is generated by randomly deleting an edge from the current configuration and randomly adding an edge connecting the two components.",
          2
        );
      });

      let notViolated = !isDegreeViolated(getDegree(MST), degree);
      addStates(states, MST.slice(), [], [], notViolated + "", 3);
      if (notViolated) {
        let newWeight = getWeight(MST);
        let acceptanceProb = newWeight - weight;
        addStates(states, MST, [], [], newWeight + " < " + weight, 4);
        if (acceptanceProb < 0) {
          weight = getWeight(MST);
          DCMST = MST.slice();
          addStates(states, [], DCMST, [], "", 5);
        } else {
          let prob = Math.E ** (-acceptanceProb / TEMP_RANGE);
          let realNum = [0, 1][Math.floor(Math.random() * 2)];
          addStates(
            states,
            MST,
            [],
            [],
            "exp(newWeight- weight)/Temperature_k = " + prob + " > " + realNum,
            6
          );
          if (prob > realNum) {
            weight = getWeight(MST);
            DCMST = MST.slice();
            addStates(states, [], DCMST, [], "", 7);
          } else {
            MST = oldMST.slice();
          }
        }
      }
      addStates(states, MST.slice(), [], [], "", 8);
      addStates(
        states,
        MST.slice(),
        [],
        [],
        "Temperature_k = " + TEMP_RANGE + " *= 0.9 = " + TEMP_RANGE * 0.9,
        9
      );
      K_LEVEL++;
      TEMP_RANGE *= alpha;
    }
    if (DCMST.length != graph.nodes.length - 1)
      throw ErrMessage.DCMST_NOT_FOUND;
    addStates(states, [], DCMST, [], "", 10);
    return states;
  } catch (e) {
    return e;
  }
}

export function simulatedAnnealingPenalty(graph, degree) {
  try {
    let MST = kruskals(graph);
    let states = [{ highlighted: MST.slice(), tree: [], text: "", status: 0 }];
    if (MST == ErrMessage.MST_NOT_FOUND) throw ErrMessage.DCMST_NOT_FOUND;
    let K_LEVEL = 0;
    let alpha = 0.9;
    let TEMP_RANGE = 5000;
    let MAX_TEMP_LEVEL = 1000;
    let DCMST = [];

    let weight = Number.MAX_SAFE_INTEGER;
    let constraintObjective = Number.MAX_SAFE_INTEGER;
    let violatedTimes = 0;
    let degrees = getDegree(MST);

    while (K_LEVEL < MAX_TEMP_LEVEL) {
      
      TEMP_RANGE *= alpha;

      let oldMST = MST.slice();
      addStates(states, oldMST, [], [], "", 1);
      generateNeighbourhood(MST, graph, function() {
        addStates(
          states,
          MST.slice(),
          [],
          [],
          "Neighbourhood is generated by randomly deleting an edge from the current configuration and randomly adding an edge connecting the two components.",
          2
        );
      });

      let isViolated = isDegreeViolated(degrees, degree);

      addStates(states, MST.slice(), [], [], isViolated + "", 3);
      if (isViolated) {
        violatedTimes++;
        addStates(states, MST.slice(), [], [], violatedTimes, 4);
      } else {
        violatedTimes--;
        addStates(states, MST.slice(), [], [], violatedTimes, 5);
      }

      degrees = getDegree(MST);

      addStates(states, MST.slice(), [], [], "", 6);
      if (violatedTimes < graph.nodes.length / 2) {
        addStates(states, MST.slice(), [], [], "", 7);
        let newWeight = costFunction(MST, degrees, degree, violatedTimes);
        let acceptanceProb = newWeight - weight;
        let prob = Math.E ** (-acceptanceProb / TEMP_RANGE);
        let realNum = [0, 1][Math.floor(Math.random() * 2)];
        if (acceptanceProb < 0 || prob > realNum) {
          weight = newWeight;
          DCMST = MST.slice();
          constraintObjective = getViolated(degrees, degree);
          addStates(states, [], DCMST, [], "", 8);
        } else {
          MST = oldMST.slice();
        }
      } else {
        //Minimise the degree constraint violation
        addStates(states, MST.slice(), [], [], "", 9);
        addStates(states, MST.slice(), [], [], "", 10);
        let newConstraint = getViolated(degrees, degree);
        let acceptanceProb = newConstraint - constraintObjective;
        let prob = Math.E ** (-acceptanceProb / TEMP_RANGE);
        let realNum = [0, 1][Math.floor(Math.random() * 2)];
        if (acceptanceProb < 0 || prob > realNum) {
          constraintObjective = newConstraint;
          weight = getWeight(MST);
          DCMST = MST.slice()
          addStates(states, [], DCMST, [], "", 11);
        } else {
          MST = oldMST.slice();
        }
      }
      K_LEVEL++;
      addStates(states, MST.slice(), [], [], "k_level = " + K_LEVEL, 12);
      addStates(
        states,
        MST.slice(),
        [],
        [],
        "Temperature_k = " + TEMP_RANGE + " *= 0.9 = " + TEMP_RANGE * 0.9,
        13
      );
    }
    if (
      isDegreeViolated(getDegree(DCMST), degree) ||
      DCMST.length != graph.nodes.length - 1
    )
      throw ErrMessage.DCMST_NOT_FOUND;
    addStates(states, [], DCMST, [], "", 14);
    return states;
  } catch (e) {
    return e.toString();
  }
}
