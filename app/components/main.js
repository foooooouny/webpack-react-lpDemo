// 引入样式文件  Styles 是在 base.js 中设置的 alias
import 'Styles/app.less'

import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Redirect
} from 'react-router-dom';
import HomePage from './home';
import Detail from './detail';

const ROUTES=[
  {
    path:'/homePage',
    component: HomePage
  },
  {
    path:'/detail',
    component: Detail
  }
]

class AppMain extends Component {

  render() {
    return(
      <HashRouter>
        <div>
          <Route exact path="/"  render={() => (
            <Redirect push to='/homePage' />
          )}/>
          {
            ROUTES.map((item, i) =>
              <Route key={i} path={ item.path } component={ item.component }/>
            )
          }
        </div>
      </HashRouter>
    )
  }
}

export default AppMain;