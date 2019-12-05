import React, {Component} from 'react';

class Dialog extends Component{

        handleClose() {
            console.log("loser w")
            //this.props.handleClose()
        }
        render(){
            return(
             this.props.isOpen &&
             <div className ="overlay">
               (<div className = "dialog">   
               <h1>{this.props.title}</h1>     
                    <div className='load'>{this.props.children}</div>
                    <button onCLick={() => this.handleClose()}>Close</button>
                </div>)
                </div>
            );
        }
}

export default Dialog;