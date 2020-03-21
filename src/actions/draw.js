import { ADD_GRAPH, FETCH_GRAPHS, PASS_GRAPH } from "./types";

import electron from "electron";
const { ipcRenderer } = electron;

/**
 * Add new graph to nedb
 * @param {*} graph
 */
export const addGraph = graph => dispatch => {
  ipcRenderer.send("addGraph", graph);
  ipcRenderer.on("graph:added", (event, newGraph) => {
    var tempObj = {
      newGraph
    };
    dispatch({
      type: ADD_GRAPH,
      payload: tempObj
    });
  });
};

/**
 * Fetch all the graphs from nedb
 */
export function fetchGraphs() {
  return dispatch => {
    ipcRenderer.send("fetchGraphs");
    ipcRenderer.on("graphs:fetched", (event, graphs) => {
      dispatch({
        type: FETCH_GRAPHS,
        payload: graphs
      });
    });
  };
}

/**
 * Delete graph from dedb
 * @param {*} id
 */
export function deleteGraph(id) {
  return dispatch => {
    ipcRenderer.send("deleteGraph", id);
    ipcRenderer.on("graph:deleted", (event, graphs) => {
      dispatch({
        type: FETCH_GRAPHS,
        payload: graphs
      });
    });
  };
}

/**
 * Pass graph from page to page
 * @param {*} id
 */
export function passGraph(graph) {
  return dispatch => {
    dispatch({
      type: PASS_GRAPH,
      latestGraph: graph
    });
  };
}
