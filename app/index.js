// import 'core-js/fn/object/assign';
require('babel-polyfill')
import React from 'react';
import { render } from 'react-dom';
import Main from './components/main';

console.log(Main)

render(<Main />, document.getElementById('app'));
