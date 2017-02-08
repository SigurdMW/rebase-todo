import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Material 
import injectTapEventPlugin from 'react-tap-event-plugin';

// services
import { getLoggedInUser } from './services/services'

// components
import App from './components/App'
import Home from './components/home/Home'
import TodoLists from './components/TodoLists'
import Login from './components/auth/Login'

// css
import './index.css'

// Material dependency
injectTapEventPlugin();

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

/*
class Test extends Component {

	constructor(){
		super();
		this.state = {
			tasks: []
		}
	}
	componentDidMount(){
		this.ref = base.syncState('/tasks', {
			context: this,
			asArray: false,
			state: 'tasks'
		})
	}

	generateMockData = () => {
		var immediatelyAvailableReference = base.push('tasks', {
	    data: {name: 'George', type: 'Grizzly'},
	    then(err){
	      //console.log(err)
	    }
	  });
	  
	  console.log(immediatelyAvailableReference.key)
	  
	  const createdKey = immediatelyAvailableReference.key;
	  
	  setTimeout(() => {
	  	console.log(this.state.tasks[`${createdKey}`]) //[createdKey]
	  }, 2000)
	}

	renderTodos = (index) => {
		return (
			<li key={index}>{index}</li>
		)
	}

	render(){
		return (
			<div>Test
				<button onClick={this.generateMockData}>Test</button>
				<ul>
					{
						Object
							.keys(this.state.tasks)
							.map(index => {
								return <li key={index}>{index}</li>
							})
					}
				</ul>
			</div>
		)
	}
}
*/

//render(appRoutes, document.getElementById('root'));
render(appRoutes, document.getElementById('root'));