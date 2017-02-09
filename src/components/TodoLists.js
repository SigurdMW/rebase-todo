import React, { Component } from 'react'
import base from '../base'
import { getLoggedInUser } from '../services/services'
import { Row, Col } from 'react-grid-system'
import { Card } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { addTask, taskTemplate, updateTask } from '../services/tasks'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import UpdateTask from './task/UpdateTask'


class TodoLists extends Component {
	constructor(){
		super()
		this.state = {
			list: {}
		}
	}

	componentDidMount(){
		// get list info from location state
		if(this.props.location.state.list){
			const { list } = this.props.location.state
			this.setState({
				list
			})
		}

		// sync state with firebase
		const uid = getLoggedInUser();
		this.ref = base.syncState(`${uid}/lists/${this.props.params.listId}`, {
	    context: this,
	    state: 'list'
	  });
	}

	addTodo = (e) => {
		e.preventDefault()
		const name = this.refs.taskText.getValue()
		const task = taskTemplate({name})
		addTask(this.props.params.listId, task)
		this.refs.taskText.getInputNode().value = ""
	}

	handleUpdateTask = (taskId, obj) => {
		console.log(this.props.params.listId, taskId, obj)
		updateTask(this.props.params.listId, taskId, obj)
	}

	renderTask = (key, index) => {
		const task = this.state.list.tasks[key]
		return (
			<ListItem 
				key={key}
				initiallyOpen={false}
				nestedItems={[
          <UpdateTask 
          	key={`${key}1`}
          	id={key}
          	task={task} 
          	handleUpdateTask={this.handleUpdateTask} 
          />
         ]}
			>
				{task.name}
			</ListItem>
		)
	}


	render(){
		const { title, tasks } = this.state.list
		return (
			<div>
				<h1>{title}</h1>
				<form onSubmit={this.addTodo}>
					<TextField
			      hintText="Add new task"
			      floatingLabelText="New task name"
			      ref="taskText"
			    />
			    <RaisedButton label="Add task" primary={true} type="submit" />
				</form>

				<br /><br />

				<Row>
					<Col md={6}>
						<Card>
			      	<List>
			        	<Subheader>Todos</Subheader>
			        	{ tasks && 
									Object
										.keys(tasks)
										.map(this.renderTask)
								}
								{ !tasks && 
									<Subheader>You have no tasks</Subheader>
								}
			      	</List>
			      </Card>
					</Col>
				</Row>
			</div>
		)
	}
}

export default TodoLists