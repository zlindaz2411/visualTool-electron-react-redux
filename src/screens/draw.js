import React, { Component, Fragment } from 'react';

// graph event callbacks
const onClickGraph = function() {
    data.nodes.push({ id: "john" });
    //window.alert(data.nodes);
    //window.alert(`Clicked the graph background`);
  };
  
  const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };
  
  const onDoubleClickNode = function(nodeId) {
    window.alert(`Double clicked node ${nodeId}`);
  };
  
  const onRightClickNode = function(event, nodeId) {
    window.alert(`Right clicked node ${nodeId}`);
  };
  
  const onMouseOverNode = function(nodeId) {
    //  window.alert(`Mouse over node ${nodeId}`);
  };
  
  const onMouseOutNode = function(nodeId) {
    // window.alert(`Mouse out node ${nodeId}`);
  };
  
  const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };
  
  const onRightClickLink = function(event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
  };
  
  const onMouseOverLink = function(source, target) {
    // window.alert(`Mouse over in link between ${source} and ${target}`);
  };
  
  const onMouseOutLink = function(source, target) {
    // window.alert(`Mouse out link between ${source} and ${target}`);
  };
  
  const onNodePositionChange = function(nodeId, x, y) {
    window.alert(
      `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
    );
  };
class DrawPage extends Component {

    render(){
        return(
            <div className = "about_wrap">
                <div className ="title">
                    <h1>Draw</h1>
                </div>
                <center className ="txt_area">
                <div>
                <Graph
                    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                    data={data}
                    config={myConfig}
                    onClickNode={onClickNode}
                    onRightClickNode={onRightClickNode}
                    onClickGraph={onClickGraph}
                    onClickLink={onClickLink}
                    onRightClickLink={onRightClickLink}
                    onMouseOverNode={onMouseOverNode}
                    onMouseOutNode={onMouseOutNode}
                    onMouseOverLink={onMouseOverLink}
                    onMouseOutLink={onMouseOutLink}
                    onNodePositionChange={onNodePositionChange}
                  />

</div>
                </center>
                
            </div>
        )
    }
}


export default DrawPage;
