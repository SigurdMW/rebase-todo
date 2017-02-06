import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton	 from 'material-ui/RaisedButton'
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Card } from 'material-ui/Card';
import { Row, Col } from 'react-grid-system';

// Components
import Task from '../task/Task'
import FilterLink from  '../filters/FilterLink'
import './home.css'

class Home extends Component {
	submitTask = (e) => {
		e.preventDefault();
		if(this.refs.task.getValue()){
			this.props.addTask(this.refs.task.getValue());
			this.refs.task.getInputNode().value = ''
		}
	}

	renderTask = (todo) => {
		return (
			<Task key={todo.id} index={todo.id} id={todo.id} {...this.props}>{todo.text}</Task>
		)
		/*return (
			<Task key={key} index={index} id={this.props.tasks[index].id} {...this.props} />
		)*/
	}

	getVisibleTodos = (todos, filter) => {
		switch(filter){
			case 'SHOW_ALL':
				return todos;
			case 'SHOW_COMPLETED':
				return todos.filter(t => t.completed);
			case 'SHOW_UNCOMPLETED':
				return todos.filter(t => !t.completed);
			default:
				return todos;
		}
	}

	getFilterReadableName = (filter) => {
		switch(filter){
			case 'SHOW_ALL':
				return "";
			case 'SHOW_COMPLETED':
				return "completed";
			case 'SHOW_UNCOMPLETED':
				return 'uncompleted';
		}
	}

	render(){
		const { tasks, filters } = this.props || null;
		const todos = this.getVisibleTodos(tasks, filters);
		return (
			<div>
				<h1>To dos</h1>
				<form onSubmit={this.submitTask}>
					<TextField
				  	ref="task"
			      defaultValue=""
			      floatingLabelText="Task text"
			    />
					<RaisedButton label="Update task" primary={true} type="submit" />
				</form>    
	      {tasks.length != 0 &&
	      	<Row>
	      		<Col md={6}>
			      	<Card>
				      	<List>
				        	<Subheader>Your to-dos</Subheader>
				        	{
										/*Object
											.keys(todos)
											.map(this.renderTask)*/
										todos.map((todo) => this.renderTask(todo))
									}
				      	</List>
				      	{todos.length === 0 &&
						     	<Subheader>You have no {this.getFilterReadableName(this.props.filters)} tasks.</Subheader>
						    }
				      	<div>
									<FilterLink 
										filter="SHOW_ALL" 
										currentFilter={this.props.filters}
										{...this.props}>Show all</FilterLink>
									
									<FilterLink 
										filter="SHOW_COMPLETED" 
										currentFilter={this.props.filters}
										{...this.props}>Show completed</FilterLink>
									
									<FilterLink 
										filter="SHOW_UNCOMPLETED" 
										currentFilter={this.props.filters}
										{...this.props}>Show uncompleted</FilterLink>
				      	</div>
				      </Card>
				    </Col>
				  </Row>
	      }
			</div>
		)
	}
}

export default Home