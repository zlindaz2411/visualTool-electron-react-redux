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
                            <NavLink className = "inactive" activeClassName="active" to="/" alt="HomePage" replace>
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
                        <div className = "algorithms">
                        <h5>Algorithms &#9662;</h5>
                            </div>                       
                            
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/kruskal"
                            }
                        }alt="KruskalPage"  replace>
                             <h4>Kruskal</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/prim"
                            }} alt="PrimPage" replace>
                             <h4>Prim</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/boruvka"
                            }} alt="BoruvkaPage"  replace>
                             <h4>Boruvka</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink  className = "inactive" activeClassName="active" to={{
                                pathname:"/parallel",
                            }} alt="ParallelPage"  replace>
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