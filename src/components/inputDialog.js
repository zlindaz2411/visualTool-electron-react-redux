import React, {Component} from 'react';

/**
 * Input dialog component: a pop up with a text field.
 */
class InputDialog extends Component{

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
               (<div className = "inputDialog">  
               <div className ="block">
               <h4 className = "close" onClick={() => this.handleClose()}>x</h4> 
               <br></br>
               <center>
               <h3>{this.props.title}</h3>   
               </center>  
               </div>   
                    <form onSubmit={(e) => this.props.submitAction(e)}>
                        <center>
                        <input
                        className = "textArea"
                        type="text"
                        name="name"
                        value={this.props.value}
                        onChange={(e) => this.props.handleChange(e)}
                        />
                        </center>
                        <center>
                        <input className ="save" type="submit" value={this.props.buttonName} />
                        </center>
                    </form>
                   
                </div>)
                </div>
            );
        }
}

export default InputDialog;