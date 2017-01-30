import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton	 from 'material-ui/RaisedButton'

class EditTask extends Component {
	handleChange = (e) => {
		e.preventDefault();
		const taskId = this.props.params.taskId;
		const text = e.target.value;
		this.props.updateTask(parseInt(taskId), text);
	}

	returnToHome = () => {
		this.props.router.push("/");
	}
	
	render(){
		const taskId = this.props.params.taskId;
		const task = this.props.tasks.find(task => {
			return task.id == taskId;
		});
		var status;

		if(task){
			status = (task.completed) ? "Completed" : "Not completed";
			console.log(task)
			console.log(status)
		}
		
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
				<p>Horrible name: { taskId }<br />Status: { status }</p>
				<TextField
			      defaultValue={task.text}
			      floatingLabelText="Task text"
			      onChange={this.handleChange}
			    />
				<RaisedButton label="Update task" onClick={this.returnToHome} primary={true} />
			</div>
		)
	}
}

export default EditTask