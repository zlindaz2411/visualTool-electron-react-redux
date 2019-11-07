import { SAVE_GRAPH, FETCH_GRAPH, DELETE_GRAPH } from './types';
import electron from 'electron';

const { ipcRenderer } = electron;

export const addGraph = graph => dispatch => {

    ipcRenderer.send('addGraph', graph);
    ipcRenderer.on('graph:added', (event, graphs, newGraph) => {

        var tempObj = {
            graphs,
            newGraph
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
        ipcRenderer.on('fetched:graphs', (event, graphs) => {
            dispatch({
                type: FETCH_GRAPH,
                payload: graphs
            });
        });
    }

}

export function saveGraph(graph) {
    return dispatch => {
        ipcRenderer.send('saveGraph', note);
        ipcRenderer.on('graph:saved', (event, graphs) => {
            dispatch({
                type: FETCH_GRAPH,
                payload: graphs
            });
        });
    }
}

export function deleteNote(_id){
    return dispatch => {
        ipcRenderer.send('deleteGraph', _id);
        ipcRenderer.on('graph:deleted', (event, graphs) => {
            dispatch({
                type: FETCH_GRAPH,
                payload: notes
            });
        });
    }
}