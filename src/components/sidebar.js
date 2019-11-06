import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
            <aside className="sidebar">  
                <nav>
                    <ul>
                        <li>   
                            <NavLink  className = "inactive"  to="/" alt="HomePage" replace>
                             <h6><font color ="#84C262"> visual</font>MinSpanningTree</h6>
                            </NavLink>     
                        </li>
                        <li>
                        <div>
                            <button onClick ={this.open}>Draw a graph</button>
                            </div>                       
                        </li>

                        <li>   
                            <NavLink  className = "inactive" activeClassName="active" to={{
                                pathname:"/algorithm",
                                name:"Kruskal"
                            }} alt="AlgorithmPage"  replace>
                             <h5>Algorithms &#9662;</h5>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/algorithm",
                                name:"Kruskal"
                            }
                        }alt="AlgorithmPage"  replace>
                             <h4>Kruskal</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/algorithm",
                                name:"Prim"
                            }} alt="AlgorithmPage" replace>
                             <h4>Prim</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/algorithm",
                                name:"Borvska"
                            }} alt="AlgorithmPage"  replace>
                             <h4>Borvska</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/algorithm",
                                name:"Borvska Parallel"
                            }} alt="AlgorithmPage"  replace>
                             <h4>Borvska Parallel</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to="/performance" alt="PerformancePage"  replace>
                             <h5>Performance</h5>
                            </NavLink> 
                        </li>
                        <br></br>
                        <br></br>
                        <li>   
                            <NavLink  className = "inactive" activeClassName="active" to="/about" alt="AboutPage" replace>
                             <h5>About</h5>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink  className = "inactive" activeClassName="active" to="/notes" alt="Notes" replace>
                             <h5>Documentation</h5>
                            </NavLink> 
                        </li>

                    </ul>
                </nav>
            </aside>
        )
    }
    open(){
        window.open('../../screens/draw.js', 'Draw a graph', 'width=700,height=500');
    }
}

export default Sidebar;