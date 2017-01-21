import React, { Component } from 'react'

class Home extends Component {
	componentDidMount(){
		
	}

	submitTask = (e) => {
		e.preventDefault();
		this.props.addTask(this.todo.value);
		this.submitTaskForm.reset();
	}

	renderTask = (key, index) => {
		const task = this.props.tasks[key];
		return (
			<p key={key}>{ task.text }</p>
		)
	}
	render(){
		const { tasks } = this.props; //{tasks.map(this.renderTask)}
		return (
			<div>
				<p>Hello world</p>
				<form ref={(value) => this.submitTaskForm = value} onSubmit={this.submitTask}>
					<input type="text" ref={(value) => this.todo = value} placeholder="Ny oppgave" />
					<button type="submit" value="submit">Legg til</button>
				</form>
				{
					Object
						.keys(tasks)
						.map(this.renderTask)
				}
			</div>
		)
	}
}

export default Home