import { FETCH_GRAPHS, ADD_GRAPH} from '../../actions/types';

const INITIAL_STATE = {
    arr: [],
    latestGraph: {},
    error: null,
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case ADD_GRAPH:
            console.log("graph adding")
            return {...state, arr: action.payload.graphs, latestGraph: action.payload.newGraph}
        case FETCH_GRAPHS:
            return {...state, arr: action.payload}
        default: 
            return state;
    }
}

