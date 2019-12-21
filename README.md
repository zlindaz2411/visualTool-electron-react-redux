# VisualMinSpanningTree

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

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

* Node
* Yarn (optional but recommended)
* Git command line tools

### Download & Install Dependencies on your machine 
1) Clone the repo
```
git clone <CloneURL>
```

2)	Cd to the cloned repo

```
yarn install OR npm install
```


2)	Install the dependencies of the applicaiton

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



### Package Application
Run the following command to package the application.

```
yarn run dist
```

Once complete the system will output a 'dist' folder with your packaged app.

Please note that you must have installed project dependencies and run a build before attempting to package your app.



