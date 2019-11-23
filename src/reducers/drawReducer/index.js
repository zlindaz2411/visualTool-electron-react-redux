import { FETCH_GRAPH, ADD_GRAPH, ADD_EDGE, ADD_NODE} from './../../actions/types';

const INITIAL_STATE = {
    arr: [],
    latestGraph: {}
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case ADD_GRAPH:
            return {...state, arr: action.payload.graphs, latestGraph: action.payload.newGraph}
        case FETCH_GRAPH:
            return {...state, arr: action.payload}
        default: 
            return state;
    }
}