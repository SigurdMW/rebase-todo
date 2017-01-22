import React, { Component } from 'react'
import { Link } from 'react-router'
import './task.css'

class Task extends Component {
	handleCompletion = () => {
		this.props.toggleCompletedTask(this.props.index);
	}

	render(){
		const { text, completed } = this.props.task;
		const { index } = this.props;
		return (
			<li className="single-task">
				<input 
					type="checkbox" 
					defaultValue={ completed } 
					id={`task-${index}`} 
					onChange={this.handleCompletion} />
				<label 
					htmlFor={`task-${index}`}>
					{ text }
				</label>
				<Link to={`/task/${index}`}>Endre</Link>
			</li>
		)
	}
}

export default Task;