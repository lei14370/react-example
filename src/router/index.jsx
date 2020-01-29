import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '@/page/home';
import Login from '@/page/login';

export default function Router() {
  return <HashRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
  </HashRouter>;
};
