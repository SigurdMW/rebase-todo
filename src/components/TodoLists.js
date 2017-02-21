import React, { Component } from 'react'
import base from '../base'
import { Row, Col } from 'react-grid-system'
import { Card } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { addTask, taskTemplate, updateTask, deleteTask } from '../services/tasks'
import { deleteList } from '../services/lists'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import UpdateTask from './task/UpdateTask'
import Checkbox from 'material-ui/Checkbox'
import { removeBaseSync } from '../services/services'
import Snackbar from 'material-ui/Snackbar'


class TodoLists extends Component {
	constructor(){
		super()
		this.state = {
			list: {},
			key: "",
			message: "",
			isAuthUser: false,
			authUser: {}
		}
	}

	syncAuthPropsToState = (isAuthUser, authUser) => {
		this.setState({
  		isAuthUser: isAuthUser,
  		authUser: authUser
  	})
	}

	getListFromRouter = (listId) => {
		if(this.props.isAuthUser){
			const uid = this.props.authUser.uid
			
			this.ref = base.syncState(`${uid}/lists/${listId}`, {
	    context: this,
	    state: 'list'
	  })
		}
	}

	componentDidMount(){
		// get list info from location state
		//this.getListFromRouter()
		if(this.props.isAuthUser){
			this.syncAuthPropsToState(
				this.props.isAuthUser,
				this.props.authUser
			)
		}

		// sync state with firebase
		if(this.props.location.state.list){
			const { list, key } = this.props.location.state
			this.setState({
				list: list,
				key: key
			})
			this.getListFromRouter(key)
		}
	}

	componentWillReceiveProps(nextProps, nextState){
		if(this.state.isAuthUser !== nextState.isAuthUser){
			this.syncAuthPropsToState(
				nextProps.isAuthUser,
				nextProps.authUser
			)
		}

		if(this.props.location.state.key !== nextProps.location.state.key){
			if(this.ref){
				removeBaseSync(this)
			}
			const { list, key } = nextProps.location.state
			this.setState({
				list: list,
				key: key
			})
			this.getListFromRouter(nextProps.location.state.key)
		}	
	}

	componentWillUnmount(){
		if(this.ref){
			removeBaseSync(this)
		}
	}

	handleDeleteList = () => {
		deleteList(this.props.authUser.uid,this.props.location.state.key)
		this.setState({ message: "Successfully deleted list."})
	}

	addTodo = (e) => {
		e.preventDefault()
		const name = this.refs.taskText.getValue()
		const task = taskTemplate({name})
		addTask(this.props.authUser.uid, this.props.params.listId, task)
		this.refs.taskText.getInputNode().value = ""
	}

	handleUpdateTask = (taskId, obj) => {
		console.log(this.props.params.listId, taskId, obj)
		updateTask(
			this.props.authUser.uid,
			this.props.params.listId, 
			taskId, 
			obj
		)
	}

	handleDeleteTask = (taskId) => {
		deleteTask(
			this.props.authUser.uid,
			this.props.params.listId, 
			taskId
		)
	}

	handleToggle = (taskId) => {
		updateTask(
			this.props.authUser.uid, 
			this.props.params.listId, 
			taskId, 
			{
				completed: !this.state.list.tasks[taskId].completed
			}
		)
	}

	renderTask = (key, index) => {
		const task = this.state.list.tasks[key]
		return (
			<ListItem
				leftCheckbox={<Checkbox checked={task.completed} onCheck={() => this.handleToggle(key)} />} 
				key={key}
				initiallyOpen={false}
				nestedItems={[
          <UpdateTask 
          	key={`${key}1`}
          	id={key}
          	task={task} 
          	handleUpdateTask={this.handleUpdateTask}
          	handleDeleteTask={this.handleDeleteTask}
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
			      floatingLabelText="Add task"
			      ref="taskText"
			    />
			    <RaisedButton label="Add task" primary={true} type="submit" />
				</form>

				<br /><br />

				<RaisedButton label="Delete list" onTouchTap={(e) => {e.preventDefault();this.handleDeleteList()}} secondary={true} />
				{
					this.state.message &&
					 <Snackbar
	          open={true}
	          message={this.state.message}
	          autoHideDuration={4000}
	        />
				}

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