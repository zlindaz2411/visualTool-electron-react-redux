import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {test} from '../functions/algorithms';


class Sidebar extends Component {

    render() {
        return (
            <aside className="sidebar">  
                <nav>
                    <ul>
                        <li>   
                            <NavLink  to="/" alt="HomePage" replace>
                             <h6><font color ="#84C262"> visual</font>MinSpanningTree</h6>
                            </NavLink>     
                        </li>
                        <li>
                        <div>
                        <NavLink  to="/draw" alt="DrawPage" replace> 
                          <button >Draw a graph</button>
                         </NavLink>    
                            </div>                       
                        </li>

                        <li>   
                             <h5>Algorithms &#9662;</h5>
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/kruskal",
                                name:"Kruskal"
                            }
                        }alt="AlgorithmPage"  replace>
                             <h4>Kruskal</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/prim",
                                name:"Prim"
                            }} alt="AlgorithmPage" replace>
                             <h4>Prim</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/boruvka",
                                name:"Boruvka"
                            }} alt="AlgorithmPage"  replace>
                             <h4>Borvska</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink  className = "inactive" activeClassName="active" to={{
                                pathname:"/parallel",
                                name:"Boruvka Parallel"
                            }} alt="AlgorithmPage"  replace>
                             <h4>Boruvka Parallel</h4>
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
    // open(){
    //     return <NavLink   to="/draw" alt="DrawPage" replace></NavLink>
    // }
}

export default Sidebar;