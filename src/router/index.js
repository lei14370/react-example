import React from 'react';

import {Router, Route, Switch} from 'react-router-dom';
import {Container} from '@/components';
import menu from './menu';
import Home from '@/pages/home';
import Page1 from '@/pages/page';
import {createBrowserHistory} from 'history';
const history=createBrowserHistory();
history.listen((local)=>{
    console.log(local)
})
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {}
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={props=>{
                        return <Container {...props} menu={menu}>
                            <Home/>
                        </Container>
                    }}/>
                    <Route exact path="/basicdata" component={props=>{
                        return <Container {...props} menu={menu}>
                            <Page1/>
                        </Container>
                    }}/>
                </Switch>
            </Router>
        );
    }
}

export default Component;