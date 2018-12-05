import '@babel/polyfill';
import React from 'react';
import ReactDom from 'react-dom';

import Router from './router/index';
import './css/base.scss';
import '~/antd/dist/antd.css';
import './css/app.scss';

ReactDom.render(
    <Router/>, document.getElementById('app'));