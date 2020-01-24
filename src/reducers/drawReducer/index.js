import { FETCH_GRAPHS, ADD_GRAPH, PASS_GRAPH} from '../../actions/types';

const INITIAL_STATE = {
    arr: [],
    latestGraph: {},
    error: null,
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case ADD_GRAPH:
            return {...state}
        case FETCH_GRAPHS:
            return {...state, arr: action.payload}
        case PASS_GRAPH:
            return {...state, latestGraph: action.latestGraph}
        default: 
            return state;
    }
}



