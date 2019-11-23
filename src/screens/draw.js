import React, { Component, Fragment } from 'react';
import { data1, myConfig } from "../constants/defaultGraph";
import * as d3 from 'd3';
import Graph from '../components/d3/graph';



class DrawPage extends Component {
    constructor(props) {
        super(props);
      }
     
    render(){
        return(
            <div className = "about_wrap">
                <div className ="title">
                    <h1>Draw</h1>
                </div>
                <center >
                  <div className="canvas">
                  <Graph data={data1} />
                  </div>
                <div>
       
                </div>
                </center>
                
            </div>
        )
    }
}


export default DrawPage;
