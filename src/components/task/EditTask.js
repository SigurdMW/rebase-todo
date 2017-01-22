import React, { Component } from 'react'

class EditTask extends Component {
	handleChange = (e) => {
		e.preventDefault();
		const taskId = this.props.params.taskId;
		const task = this.props.tasks[taskId];
		const text = this.text.value;
		this.props.updateTask(taskId, text);
		this.props.router.push('/');
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
				<form ref={(input) => this.changeForm = input} onSubmit={this.handleChange}>
					<input defaultValue={task.text} ref={(input) => this.text = input} />
					<button type="submit">Lagre</button>
				</form>
			</div>
		)
	}
}

export default EditTask