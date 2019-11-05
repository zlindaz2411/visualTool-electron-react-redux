import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
      }
      openPopup() {
        this.setState({ open: true });
      }
      closePopup() {
        this.setState({ open: false });
      }
    
    render() {
        return (
            <aside className="sidebar">  
                <nav>
                    <ul>
                        <li>   
                            <NavLink  activeClassName="active" to="/" alt="HomePage" replace>
                             <h6><font color ="#84C262"> visual</font>MinSpanningTree</h6>
                            </NavLink>     
                        </li>
                        <li>
                        <div>
                            <button onClick ={this.openPopup}>Draw a graph</button>
                            </div>                       
                        </li>

                        <li>   
                            <NavLink activeClassName="active" to="/algorithm" alt="AlgorithmPage"  replace>
                             <h5>Algorithms &#9662;</h5>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink  activeClassName="active" to="/algorithm" alt="AlgorithmPage"  replace>
                             <h4>Kruskal</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink  activeClassName="active" to="/algorithm" alt="AlgorithmPage"  replace>
                             <h4>Prim</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink  activeClassName="active" to="/algorithm" alt="AlgorithmPage"  replace>
                             <h4>Borvska</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink  activeClassName="active" to="/algorithm" alt="AlgorithmPage"  replace>
                             <h4>Borvska Parallel</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink  to="/about" alt="AboutPage" replace>
                             <h5>About</h5>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink  to="/notes" alt="Notes" replace>
                             <h5>Documentation</h5>
                            </NavLink> 
                        </li>

                    </ul>
                </nav>
            </aside>
        )
    }
}

export default Sidebar;