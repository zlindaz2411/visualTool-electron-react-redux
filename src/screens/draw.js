import React, { Component, Fragment } from 'react';
import { data } from "../constants/defaultGraph";
import * as d3 from 'd3';
import Graph from '../components/d3/graph';

import { removeAll, drawGraph, setWidthHeight, handleDelete} from "../components/d3/graph1";
import { remove } from 'fs-extra-p';



class DrawPage extends Component {
    constructor(props) {
        super(props);
      }

      componentDidMount() {
        setWidthHeight();
        drawGraph(data, true);
      }
    render(){
        return(
            <div className = "about_wrap">
                <div className ="title">
                    <h1>Draw</h1>
                    
                </div>
                <div className ="sub_text">
                   <h2 >Click on empty space to draw a vertex. Drag from vertex to vertex to create an edge.</h2>
                   <h2 >Select a vertex or an edge to delete.</h2>
                </div>
                <center >
                  <div className="canvas">
                  </div>
                  <div className="action_buttons">
                  <button onClick={() => this.delete()}>Delete</button>
                  <button onClick={() => this.clearAll()}>CLear</button>
                </div>
                </center>
                
            </div>
        )
    }
    delete(){
      handleDelete(data);
    }
    clearAll(){
     //   data = {};
     //need to clear 
        removeAll();
    }
}


export default DrawPage;
