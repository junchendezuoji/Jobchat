import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {BrowserRouter,Route,Link,Switch,Redirect} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'

import Login from './container/login/login'
import Register from './container/register/register'
import PublisherInfo from './container/publisherinfo/publisherinfo'
import HunterInfo from './container/hunterinfo/hunterinfo'
import AuthRoute from './component/authroute/authroute'
import reducers from  './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

function publisher () {
    return <h1>haha</h1>
}
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/publisherinfo' component={PublisherInfo}></Route>
                    <Route path='/hunterinfo' component={HunterInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                </Switch>   
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)
