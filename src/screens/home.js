import React, { Component, Fragment } from 'react';
import SpanTree from './../assets/images/graph.png';


class HomePage extends Component {

    componentDidMount() {
    }

    render(){
        return(
            <div className = "home_wrap">
                <div className ="title">
                    <h1>Welcome to visualMinSpanningTree</h1>
                </div>
                <div className ="sub_text">
                    <h2>A visual tool for minimum spanning tree algorithms </h2>
                </div>
                <center>
                    <div className= "img_wrap">

                        <img src ={SpanTree} />
                    </div>
                </center>
                <div className ="sub_text">
                    <h3>Choose an algorithm and see the visualization on a default graph </h3>
                    <br></br>
                    <h3>Otherwise, you can draw your own graph. </h3>
                </div>
            </div>
        )
    }
}


export default HomePage;
