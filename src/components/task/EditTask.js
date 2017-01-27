import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

class EditTask extends Component {
	handleChange = (e) => {
		e.preventDefault();
		const taskId = this.props.params.taskId;
		const task = this.props.tasks[taskId];
		const text = e.target.value;
		this.props.updateTask(taskId, text);
	}
	
	render(){
		const taskId = this.props.params.taskId;
		const task = this.props.tasks[taskId] || null;
		
		if(!task){
			return (
				<div>
					<h1>Ikke funnet</h1>
				</div>
			)
		}

		return (
			<div>
				<h1>Endre task</h1>
				<TextField
			      defaultValue={task.text}
			      floatingLabelText="Task text"
			      onChange={this.handleChange}
			    />
				<button type="submit">Lagre</button>
			</div>
		)
	}
}

export default EditTask