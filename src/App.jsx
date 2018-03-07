import React from 'react'
import { hot } from 'react-hot-loader'
import { renderRoutes } from 'react-router-config'
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import routes from './routes'
import * as stores from './store'
import './App.scss'

useStrict(true) // 不允许在动作之外进行状态修改

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)

const App = () => (
  <div className='App'>
    <Router history={history}>
      {renderRoutes(routes)}
    </Router>
  </div>
)

const reduxApp = () => (
  <Provider store={stores}>
    <App />
  </Provider>
)

export default hot(module)(reduxApp)
