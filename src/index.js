import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import './index.css';

// components
import App from './components/App';
import Main from './components/Main';
import Home from './components/Home';
//import NotFound from './components/NotFound';

const appRoutes = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	</Provider>
)

render(appRoutes, document.getElementById('root'));