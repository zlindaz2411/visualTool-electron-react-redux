/**
 * Constants of algorithms
 */
export const Algorithm = {
  KRUSKAL: "Kruskal",
  PRIM: "Prim",
  BORUVKA: "Boruvka",
  PARALLEL: "Boruvka parallel",
  CONSTRAINED: "Kruskal with constraint",
  SIMULATED: "Simulated annealing",
  PENALTY: "Simulated annealing with penalty",
  ESAU: "Esau-Williams"
};

/**
 * Constants of description of problems
 */
export const ProblemDescription = {
  MSTP:
    "Minimum Spanning Tree Problem: find the spanning tree with the minimum sum of the weights.",
  DCMSTP:
    "Degree Constrained Minimum Spanning Tree Problem (NP): find the spanning tree with the minimum sum of the weights and the maximum vertex degree is at most K.",
  CMSTP:
    "Capacitated Minimum Spanning Tree Problem (NP): find a rooted spanning tree of minimum cost in which each of the subtrees of the root node contains at most K nodes."
};
