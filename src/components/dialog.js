import React, {Component} from 'react';

class Dialog extends Component{

        /**
         * Close the dialog
         * The function is passed from the parent component
         */
        handleClose() {
            this.props.handleClose();
        }
        render(){
            return(
             this.props.isOpen &&
             <div className ="overlay">
               (<div className = "dialog">   
               <h1>{this.props.title}</h1>  
               <button onClick={() => this.handleClose()}>x</button>   
                    <div>{this.props.children}</div>
                   
                </div>)
                </div>
            );
        }
}

export default Dialog;