import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Router from '@/router';
import 'antd/dist/antd.css';
global.React=React;
global.PropTypes=PropTypes;

ReactDOM.render(
    <Router/>,
    document.getElementById('root'),
);
