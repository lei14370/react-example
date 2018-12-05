import React from 'react';

import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {Container} from '@/components';
import Home from '@/pages/home'
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {}
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={(match,history)=>{
                        return <Container>
                            <Home/>
                        </Container>
                    }}/>
                </Switch>
            </Router>
        );
    }
}

export default Component;