import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton	 from 'material-ui/RaisedButton'
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Card } from 'material-ui/Card';
import { Row, Col } from 'react-grid-system';

// Components
import Task from '../task/Task'
import './home.css'

class Home extends Component {
	submitTask = (e) => {
		e.preventDefault();
		if(this.refs.task.getValue()){
			this.props.addTask(this.refs.task.getValue());
			this.refs.task.getInputNode().value = ''
		}
	}

	renderTask = (key, index) => {
		return (
			<Task key={key} index={index} id={this.props.tasks[index].id} {...this.props} />
		)
	}

	render(){
		const { tasks } = this.props || null;
		return (
			<div>
				<h1>To dos</h1>
				<form onSubmit={this.submitTask}>
					<TextField
				  	ref="task"
			      defaultValue=""
			      floatingLabelText="Task text"
			    />
					<RaisedButton label="Update task" primary={true} type="submit" />
				</form>    
	      {tasks.length != 0 &&
	      	<Row>
	      		<Col md={6}>
			      	<Card>
				      	<List>
				        	<Subheader>Your to-dos</Subheader>
				        	{
										Object
											.keys(tasks)
											.map(this.renderTask)
									}
				      	</List>
				      </Card>
				    </Col>
				  </Row>
	      }
			</div>
		)
	}
}

export default Home