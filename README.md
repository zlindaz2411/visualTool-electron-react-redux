# VisualMinSpanningTree

A desktop application using Electron, React and Redux. 
The application is an educational tool which allows user: to draw a graph (udirected weighted graph), to visualize the minimum spanning tree algorithms (Prim, Boruvka, Kruskal, Parallel) applied to the given graph and to compare the performance of different algorithms.

### Tech Stack:

* Electron
* Electron Builder
* React 
* Redux
* NeDB
* Redux Thunk
* React Router
* Babel
* Webpack
* SASS


## Prerequisite
You must have the following software installed on your computer.

* Node or Yarn (Preferrably)
* Git command line tools

## Note
If running the following commands doesn't work, try adding "sudo". For example: 
```
sudo yarn install.
```

## How to run the app
### Download & Install Dependencies on your machine 

1)	Install the dependencies of the application

```
yarn install OR npm install
```

### Run a Build

Before we can running the project, we need to run a build

```
yarn run webpack:watch OR npm run webpack:watch
```

### Lunch/Run the Project

Run the project

```
yarn run electron:dev OR npm run electron:dev 
```

### Run the tests & code coverage

Run the test 
```
yarn run test or npm run test

```

Run the code coverage
```
yarn run coverage or npm run coverage

```

### Package Application
Run the following command to package the application.

```
yarn run dist
```

Once complete the system will output a 'dist' folder with your packaged app.

Please note that you must have installed project dependencies and run a build before attempting to package your app.

### Folder Structure

```bash
├── build
│   ├── assets
│   │   ├── css
│   │   │   └── styles.min.css
│   │   ├── graphics
│   │   │   ├── graph.png
│   │   │   └── logo.png
│   │   ├── images
│   │   │   └── graph.png
│   │   └── instruction.pdf
│   ├── bundle.js
│   ├── index.html
│   └── static_assets
│       ├── instruction.pdf
│       ├── linux
│       │   └── icon.png
│       ├── mac
│       │   └── icon.png
│       └── win
│           └── icon.png
├── data
│   └── graphs.db
├── src
│   ├── actions
│   │   ├── draw.js
│   │   └── types.js
│   ├── app.js
│   ├── assets
│   │   ├── images
│   │   │   ├── graph.png
│   │   │   └── logo.png
│   │   ├── scss
│   │   │   ├── _config.scss
│   │   │   ├── base
│   │   │   │   ├── _css_grid.scss
│   │   │   │   ├── _default.scss
│   │   │   │   ├── _forms.scss
│   │   │   │   └── _normalize.scss
│   │   │   ├── component
│   │   │   │   ├── _dialog.scss
│   │   │   │   ├── _inputDialog.scss
│   │   │   │   └── _sidebar.scss
│   │   │   ├── lib
│   │   │   │   ├── _react-confirm-alert.scss
│   │   │   │   └── _toastr.scss
│   │   │   ├── screens
│   │   │   │   ├── _about.scss
│   │   │   │   ├── _algorithm.scss
│   │   │   │   ├── _draw.scss
│   │   │   │   ├── _esau.scss
│   │   │   │   ├── _home.scss
│   │   │   │   ├── _performance.scss
│   │   │   │   └── _prim.scss
│   │   │   └── styles.scss
│   │   └── static_assets
│   │       ├── instruction.pdf
│   │       ├── linux
│   │       │   └── icon.png
│   │       ├── mac
│   │       │   └── icon.png
│   │       └── win
│   │           └── icon.png
│   ├── client.js
│   ├── components
│   │   ├── dialog.js
│   │   ├── inputDialog.js
│   │   └── sidebar.js
│   ├── constants
│   │   ├── algorithms.js
│   │   ├── defaultGraph.js
│   │   ├── errorMessage.js
│   │   └── visualizationConstants.js
│   ├── functions
│   │   ├── cmstAlgorithms.js
│   │   ├── cmstStateAlgorithm.js
│   │   ├── d3Functions.js
│   │   ├── dcmstAlgorithms.js
│   │   ├── dcmstStateAlgorithms.js
│   │   ├── lib
│   │   │   ├── graph.js
│   │   │   ├── priorityQueue.js
│   │   │   └── unionFind.js
│   │   ├── mstAlgorithms.js
│   │   ├── mstStateAlgorithms.js
│   │   ├── performance.js
│   │   ├── pseudocode.js
│   │   ├── stateFunctions.js
│   │   ├── util.js
│   │   ├── validator.js
│   │   └── worker.js
│   ├── layouts
│   │   └── mainLayout.js
│   ├── reducers
│   │   ├── drawReducer
│   │   │   └── index.js
│   │   └── index.js
│   ├── renderer
│   │   └── index.html
│   └── screens
│       ├── about.js
│       ├── algorithm.js
│       ├── boruvka.js
│       ├── draw.js
│       ├── esau.js
│       ├── home.js
│       ├── kruskal.js
│       ├── kruskalConstrained.js
│       ├── parallel.js
│       ├── performance.js
│       ├── prim.js
│       └── simulated.js
├── tests
│   ├── functions
│   │   ├── cmstAlgorithms.test.js
│   │   ├── cmstStateAlgorithms.test.js
│   │   ├── dcmstAlgorithms.test.js
│   │   ├── dcmstStateAlgorithms.test.js
│   │   ├── graph.test.js
│   │   ├── mstAlgorithms.test.js
│   │   ├── mstStateAlgorithms.test.js
│   │   ├── performance.test.js
│   │   ├── priorityQueue.test.js
│   │   ├── pseudocode.test.js
│   │   ├── stateFunctions.test.js
│   │   ├── unionFind.test.js
│   │   └── util.test.js
│   └── redux
│       └── drawReducer.test.js
├── webpack.js
├── main.js
├── package.json
└── README.md
```



