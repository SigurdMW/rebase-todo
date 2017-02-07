import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './index.css';

// test 
import base from './base'

// components
import App from './components/App';
import Home from './components/home/Home';
import EditTask from './components/task/EditTask'
//import NotFound from './components/NotFound';

const appRoutes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/task/:taskId" component={EditTask} />
		</Route>
	</Router>
)

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

//render(appRoutes, document.getElementById('root'));
render(<Test />, document.getElementById('root'));