import React from 'react';

import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from '../home';


const getRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
    </Router>
);

export default getRouter;