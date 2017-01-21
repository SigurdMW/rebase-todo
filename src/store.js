import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/root';

const tasks = [];

// create and object for the default data
const defaultState = {
	tasks
};

const enhancers = compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

/* enable hot reload in store files
if(module.hot){
	module.hot.accept('./reducers', () => {
		const nextRootReducer = require('./reducers/root').default;
		store.replaceReducer(nextRootReducer);
	})
}
*/

export default store;