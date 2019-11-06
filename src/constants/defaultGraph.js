export const data = {
    nodes: [{ id: 1, x: 20, y: 200 },
        { id: 2, x: 80, y: 100 },
        { id: 3, x: 200, y: 100 },
        { id: 4, x: 320, y: 100},
        { id: 5, x: 380, y: 200 },
        { id: 6, x: 320, y: 300},
        { id: 7, x: 200, y: 300 },
        { id: 8, x: 80, y: 300},
  { id: 9, x: 150, y: 200 },
    ],
    links: [
        {source:1, target:2, weight:4},
        {source:2, target:3, weight:8},
        {source:3, target:4, weight:7},
        {source:4, target:5, weight:9},
        {source:5, target:6, weight:10},
        {source:6, target:3, weight:14},
        {source:6, target:7, weight:2},
        {source:4, target:6, weight:1},
        {source:7, target:8, weight:7},
        {source:7, target:9, weight:6},
        {source:8, target:9, weight:7},
        {source:8, target:1, weight:8},
        {source:2, target:8, weight:11},
        {source:9, target:3, weight:2},
    ],
};
export const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "lightgreen",
        size: 120,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    },
};
 