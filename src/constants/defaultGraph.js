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
    edges: [
        {source:1, target:2, label:4},
        {source:2, target:3, label:8},
        {source:3, target:4, label:7},
        {source:4, target:5, label:9},
        {source:5, target:6, label:10},
        {source:6, target:3, label:14},
        {source:6, target:7, label:2},
        {source:4, target:6, label:1},
        {source:7, target:8, label:7},
        {source:7, target:9, label:6},
        {source:8, target:9, label:7},
        {source:8, target:1, label:8},
        {source:2, target:8, label:11},
        {source:9, target:3, label:2},
    ],
};

export var data1= {
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

    edges: [
        {source:1, target:2, weight:4,highlight:false, tree:false},
        {source:2, target:3, weight:8,highlight:false, tree:false},
        {source:3, target:4, weight:7,highlight:false,tree:false},
        {source:4, target:5, weight:9,highlight:false,tree:false},
        {source:5, target:6, weight:10,highlight:false,tree:false},
        {source:6, target:3, weight:14,highlight:false,tree:false},
        {source:6, target:7, weight:2,highlight:false,tree:false},
        {source:4, target:6, weight:1,highlight:false,tree:false},
        {source:7, target:8, weight:7,highlight:false,tree:false},
        {source:7, target:9, weight:6,highlight:false,tree:false},
        {source:8, target:9, weight:7,highlight:false,tree:false},
        {source:8, target:1, weight:8,highlight:false,tree:false},
        {source:2, target:8, weight:11,highlight:false,tree:false},
        {source:9, target:3, weight:2,highlight:false,tree:false},
    ],
};



export const nodes = [1,2,3,4,5,6,7,8,9];
export const links= [
    ["A","B",4],
    ["B","C",8],
    ['C',"D",7],
    ["D","E",9],
    ["E","F",10],
    ["C","F",4],
    ["F","G",2],
    ["D","F",14],
    ['G','H',1],
    ['G',"I",6],
    ["H","I",7],
    ["H","A",8],
    ["B","H",11],
    ["I","C",2],
]


export const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "#84C262",
        size: 120,
        highlightStrokeColor: "blue",
        
    },
    link: {
        highlightColor: "#94979D",
        renderLabel:true,
    },
};
 