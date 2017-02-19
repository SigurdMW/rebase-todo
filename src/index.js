import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Material 
import injectTapEventPlugin from 'react-tap-event-plugin';

// services
import { getLoggedInUser } from './services/auth'

// components
import App from './components/App'
import Home from './components/home/Home'
import TodoLists from './components/TodoLists'
import Login from './components/auth/Login'

// css
import './index.css'

// Material dependency
injectTapEventPlugin()

function authCheck(nextState, replace) {
	const uid = getLoggedInUser();
	
	if(!uid){
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
		</Route>
	</Router>
)
	
render(appRoutes, document.getElementById('root'));