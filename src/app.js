import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// layouts
import MainLayout from './layouts/mainLayout';

// routes/screens
import Notes from './screens/notes';
import KruskalPage from './screens/kruskal';
import PrimPage from './screens/prim';
import BoruvkaPage from './screens/boruvka';
import ParallelPage from './screens/parallel';
import HomePage from './screens/home';
import AboutPage from './screens/about';
import PerformancePage from './screens/performance';
import DrawPage from './screens/draw';



class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/kruskal" render={props => (
                        <MainLayout>
                             <KruskalPage{...props} />
                        </MainLayout>
                    )}/>
                      <Route path="/prim" render={props => (
                        <MainLayout>
                             <PrimPage{...props} />
                        </MainLayout>
                    )}/>
                      <Route path="/boruvka" render={props => (
                        <MainLayout>
                             <BoruvkaPage{...props} />
                        </MainLayout>
                    )}/>
                      <Route path="/parallel" render={props => (
                        <MainLayout>
                             <ParallelPage{...props} />
                        </MainLayout>
                    )}/>
                    <Route path="/about" render={props => (
                        <MainLayout>
                             <AboutPage {...props} />
                        </MainLayout>
                    )} />
                     <Route path="/draw" render={props => (
                        <MainLayout>
                             <DrawPage {...props} />
                        </MainLayout>
                    )} />
                      <Route path="/performance" render={props => (
                        <MainLayout>
                             <PerformancePage {...props} />
                        </MainLayout>
                    )} />
                     <Route path="/notes" render={props => (
                        <MainLayout>
                             <Notes {...props} />
                        </MainLayout>
                    )} />
                       <Route path="/" render={props => (
                        <MainLayout>
                             <HomePage {...props} />
                        </MainLayout>
                    )} />
                </Switch>
            </Router>
        )
    }
}

export default App;