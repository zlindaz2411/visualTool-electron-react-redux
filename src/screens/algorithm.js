import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import classNames from 'classnames';

import { saveNote, addNote, fetchNotes, deleteNote } from './../actions/index';

const initialState = {
    edgeList:[],
    nodeList:[],
    start: false,
    highlightedEdges : [],
    highlightedNodes : [],
}

class AlgorithmPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    componentDidMount() {
    }

    render(){
        return(
            <div className = "algorithm_wrap">
                <div className ="title">
                    <h1>Kruskal</h1>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        notes: state.notes.arr,
        latestNote: state.notes.latestNote
    }
}

export default withRouter(connect(mapStateToProps, { addNote, saveNote, fetchNotes, deleteNote })(AlgorithmPage));
