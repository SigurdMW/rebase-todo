import React, { Component } from 'react'
import { Link } from 'react-router'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'
import RaisedButton	 from 'material-ui/RaisedButton'
import './task.css'

class Task extends Component {
	handleCompletion = () => {
		this.props.toggleCompletedTask(this.props.id);
		console.log(this.props.id)
	}

	deleteTask = () => {
		this.props.deleteTask(this.props.index);
	}

	editTask = () => {
		this.props.router.push(`/task/${this.props.id}`)
	}

	render(){
		const { tasks, id } = this.props;
		const task = tasks.filter(task => { return task.id === id})
		const { text, completed} = task[0]
		const { index } = this.props;
		const status = (completed) ? "Completed" : "Not completed";
		return (
			<ListItem
          leftCheckbox={<Checkbox onCheck={this.handleCompletion} checked={completed} />}
          primaryText={text}
          secondaryText={status}
          rightIconButton={<FlatButton onClick={this.editTask} label="Endre" />}
          insetChildren={false}
        />
		)
	}
}

export default Task;