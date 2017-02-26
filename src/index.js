import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Material 
import injectTapEventPlugin from 'react-tap-event-plugin';

// services
import base from './base'

// components
import App from './components/App'
import Home from './components/home/Home'
import TodoLists from './components/TodoLists'
import PageNotFound from './components/pages/PageNotFound'

// containers
import Login from './containers/auth/Login'
import NewUser from './containers/users/NewUser'
import NewOrg from './containers/org/NewOrg'

// css
import './index.css'

// Material dependency
injectTapEventPlugin()

var authUser = true
base.onAuth((user) => {
  if (user) {
  	authUser = user
  } else {
  	authUser = false
  }
})

function authCheck(nextState, replace) {
	if(!authUser){
		replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
	}
}

const appRoutes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} onEnter={authCheck} />
			<Route path="/lists/:listId" component={TodoLists} onEnter={authCheck} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={NewUser} />
			<Route path="/new-org" component={NewOrg} />
			<Route path="*" component={PageNotFound} />
		</Route>
	</Router>
)
	
render(appRoutes, document.getElementById('root'));