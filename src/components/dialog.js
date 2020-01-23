import React, {Component} from 'react';

/**
 * Pop up window component
 */
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
               <div className ="block">
               <h4 className = "close" onClick={() => this.handleClose()}>x</h4> 
               <br></br>
               <center>
               <h1>{this.props.title}</h1>     
               </center>
               </div>   
                    <div>{this.props.children}</div>
                   
                </div>)
                </div>
            );
        }
}

export default Dialog;