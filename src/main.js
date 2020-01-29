import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch} from 'react-router-dom';
import "antd/dist/antd.css";
import Home from '@/page/home';
import Detail from '@/page/detail';
ReactDOM.render(
  <HashRouter>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/detail" component={Detail}/>
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
