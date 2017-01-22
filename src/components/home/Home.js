import React, { Component } from 'react'

import Task from '../task/Task'
import './home.css'

class Home extends Component {
	submitTask = (e) => {
		e.preventDefault();
		this.props.addTask(this.todo.value);
		this.submitTaskForm.reset();
	}

	renderTask = (key, index) => {
		const task = this.props.tasks[key];
		return (
			<Task key={key} index={key} task={task} {...this.props} />
		)
	}
	render(){
		const { tasks } = this.props; //{tasks.map(this.renderTask)}
		return (
			<div>
				<h1>To dos</h1>
				<form ref={(value) => this.submitTaskForm = value} onSubmit={this.submitTask}>
					<input type="text" ref={(value) => this.todo = value} placeholder="Ny oppgave" />
					<button type="submit" value="submit">Legg til</button>
				</form>
				<ul className="task-list">
					{
						Object
							.keys(tasks)
							.map(this.renderTask)
					}
				</ul>
			</div>
		)
	}
}

export default Home