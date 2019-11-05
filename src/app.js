import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// layouts
import MainLayout from './layouts/mainLayout';

// routes/screens
import Notes from './screens/notes';
import AlgorithmPage from './screens/algorithm';
import HomePage from './screens/home';
import AboutPage from './screens/about';



class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/algorithm" render={props => (
                        <MainLayout>
                             <AlgorithmPage{...props} />
                        </MainLayout>
                    )} />
                    <Route path="/about" render={props => (
                        <MainLayout>
                             <AboutPage {...props} />
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