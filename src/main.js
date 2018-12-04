import '@babel/polyfill';
import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router/router';
import './css/base.scss';
import '~/antd/dist/antd.css';
import './css/app.scss';

ReactDom.render(
    getRouter(), document.getElementById('app'));