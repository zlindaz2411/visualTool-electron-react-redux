import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
/**
 * Sidebar component with the main menu of the system.
 */
class Sidebar extends Component {
    constructor(props){
        super(props)
        this.MSTRef = React.createRef();
        this.CMSTRef = React.createRef();
        this.DCMSTRef = React.createRef();
    }

    /**
     * Drop down the sub items in the sidebar
     * @param {*} ref 
     */
    handleDropSubitems(ref){
        let dropdownContent = ref.current;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
          } else {
            dropdownContent.style.display = "block";
          }
    }

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
                            <h5 onClick = {() => this.handleDropSubitems(this.MSTRef)}>MST Algorithms &#9662;</h5>
                        </div>                       
                            
                        </li>
                        <div ref={this.MSTRef} class="MST-dropdown-container">
                        <li>   
                            <NavLink className = "inactive" activeClassName="active" to={{
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
                        </div>
                        <li>   
                        <div className = "algorithms">
                            <h5 onClick = {() => this.handleDropSubitems(this.DCMSTRef)}>DCMST Algorithms &#9662;</h5>
                        </div>                       
                            
                        </li>
                        <div ref={this.DCMSTRef} class="DCMST-dropdown-container">
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/kruskalConstrained"
                            }
                        }alt="KruskalConstrained"  replace>
                             <h4>Kruskal Constraint</h4>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/simulated"
                            }
                        }alt="Simulated"  replace>
                             <h4>Simulated Annealing</h4>
                            </NavLink> 
                        </li>
                        </div>
                        <li>   
                        <div className = "algorithms">
                            <h5 onClick = {() => this.handleDropSubitems(this.CMSTRef)}>CMST Algorithms &#9662;</h5>
                        </div>                       
                            
                        </li>
                        <div ref={this.CMSTRef} class="CMST-dropdown-container">
                        <li>   
                            <NavLink   className = "inactive" activeClassName="active" to={{
                                pathname:"/esau"
                            }
                        }alt="EsauPage"  replace>
                             <h4>Esau-Williams</h4>
                            </NavLink> 
                        </li>
                        </div>
                        <li>   
                            <NavLink   className = "algorithms" activeClassName="active" to="/performance" alt="PerformancePage"  replace>
                             <h5>Performance</h5>
                            </NavLink> 
                        </li>
                        <li>   
                            <NavLink   className = "algorithms" activeClassName="active" to="/about" alt="AboutPage"  replace>
                             <h5>About</h5>
                            </NavLink> 
                        </li>
                    </ul>
                </nav>
            </aside>
        )
    }
}

export default withRouter(Sidebar);