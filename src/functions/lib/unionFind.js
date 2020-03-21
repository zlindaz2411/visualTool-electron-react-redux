export class UnionFind {
  constructor(elements) {
    // Number of disconnected components
    this.count = elements.length;

    // Keep Track of connected components
    this.parent = {};

    // Initialize the data structure such that all
    // elements have themselves as parents
    elements.forEach(e => (this.parent[e.id] = e.id));
  }

  /**
   * Merge two elements
   * @param {*} a
   * @param {*} b
   */
  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);
    this.parent[rootA] = rootB;
  }

  // Returns final parent of a node
  find(a) {
    while (this.parent[a] !== a) {
      a = this.parent[a];
    }
    return a;
  }

  // Checks connectivity of the 2 nodes
  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}
