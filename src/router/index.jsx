import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '@/page/home';
import Login from '@/page/login';
import Register from '@/page/register';

export default function Router() {
  return <HashRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
    </Switch>
  </HashRouter>;
};
