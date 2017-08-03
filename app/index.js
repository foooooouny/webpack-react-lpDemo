// import 'core-js/fn/object/assign';
// es6浏览器兼容
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Main from './components/main';

render(<Main />, document.getElementById('app'));
