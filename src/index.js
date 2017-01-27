import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import './index.css';

// components
import App from './components/App';
import Home from './components/home/Home';
import EditTask from './components/task/EditTask'
//import NotFound from './components/NotFound';

const appRoutes = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/task/:taskId" component={EditTask} />
			</Route>
		</Router>
	</Provider>
)

render(appRoutes, document.getElementById('root'));