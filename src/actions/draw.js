import { ADD_GRAPH, FETCH_GRAPHS, SAVE_GRAPH, DELETE_GRAPH } from './types';
import { ADD_NOTE, FETCH_NOTES, SAVE_NOTE, DELETE_NOTE } from './types';

import electron from 'electron';
const { ipcRenderer } = electron;

export const addGraph = graph => dispatch => {
    ipcRenderer.send('addGraph', graph);
    ipcRenderer.on('graph:added', (event, graphs, newGraph) => {
        console.log("node added")
        var tempObj = {
            graphs,
            newGraph,
        }
        dispatch({
            type: ADD_GRAPH,
            payload: tempObj
        });
    });
};

export function fetchGraphs() {

    return dispatch => {
        ipcRenderer.send('fetchGraphs');
        
        ipcRenderer.on('graphs:fetched', (event, graphs) => {
            console.log(graphs);
            dispatch({
                type: FETCH_GRAPHS,
                payload: graphs,
            });
        });
    }
}

export function saveGraph(graph) {
    return dispatch => {
        ipcRenderer.send('saveGraph', graph);
        ipcRenderer.on('graph:saved', (event, graphs) => {
            dispatch({
                type: FETCH_GRAPHS,
                payload: graphs
            });
        });
    }
}

export function deleteGraph(_id){
    return dispatch => {
        ipcRenderer.send('deleteGraph', _id);
        ipcRenderer.on('graph:deleted', (event, graphs) => {
            dispatch({
                type: FETCH_GRAPHS,
                payload: graphs
            });
        });
    }
}