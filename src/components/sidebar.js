import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import pdf from '../assets/static_assets/instruction.pdf';

/**
 * Sidebar component with the main menu of the system.
 */
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
                            <h5>MST Algorithms &#9662;</h5>
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
                        <div className = "algorithms">
                            <h5>DCMST Algorithms &#9662;</h5>
                        </div>                       
                            
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/kruskalConstrained"
                            }
                        }alt="EsauPage"  replace>
                             <h4>Kruskal Constraint</h4>
                            </NavLink> 
                        </li>
                        <li>   
                        <div className = "algorithms">
                            <h5>CMST Algorithms &#9662;</h5>
                        </div>                       
                            
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/esau"
                            }
                        }alt="EsauPage"  replace>
                             <h4>Esau-Williams</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to="/performance" alt="PerformancePage"  replace>
                             <h5>Performance</h5>
                            </NavLink> 
                        </li>
                        <li>   
                             <a href={pdf} download><h5>Instruction</h5></a>
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

export default withRouter(Sidebar);