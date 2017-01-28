import React, { Component } from 'react'
import { Link } from 'react-router'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'
import RaisedButton	 from 'material-ui/RaisedButton'
import './task.css'

class Task extends Component {
	handleCompletion = () => {
		this.props.toggleCompletedTask(this.props.index);
	}

	deleteTask = () => {
		this.props.deleteTask(this.props.index);
	}

	editTask = () => {
		this.props.router.push(`/task/${this.props.index}`)
	}

	render(){
		const { text, completed } = this.props.tasks[this.props.index];
		const { index } = this.props;
		const status = (this.props.tasks[this.props.index].completed) ? "Completed" : "Not completed";
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