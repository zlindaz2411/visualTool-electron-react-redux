import React, {Component} from 'react';

class Dialog extends Component{
        render(){
            return(
            
             this.props.isOpen &&
             <div className ="overlay">
               (<div className = "dialog">   
               <h1>{this.props.title}</h1>     
                    <div className='load'>{this.props.children}</div>
                    <button onCLick={this.props.handleClose}>Close</button>
                </div>)
                </div>
            );
        }
}

export default Dialog;