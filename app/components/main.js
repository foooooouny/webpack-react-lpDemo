// 引入样式文件  Styles 是在 base.js 中设置的 alias
import 'Styles/app.less'

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter,
  Route,
  Redirect
} from 'react-router-dom';
import HomePage from './home';
import Detail from './detail';
import { getUserD, setUserD, destoryUserD, destoryAllD } from 'Components/util/contextData'

const ROUTES=[
  {
    path: '/homePage',
    component: HomePage
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]

class AppMain extends Component {
  getChildContext() {
    return {
      getUserD,
      setUserD,
      destoryUserD,
      destoryAllD
    };
  }

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

// 注册context事件
AppMain.childContextTypes = {
  getUserD: PropTypes.func,
  setUserD: PropTypes.func,
  destoryUserD: PropTypes.func,
  destoryAllD: PropTypes.func
}

export default AppMain;