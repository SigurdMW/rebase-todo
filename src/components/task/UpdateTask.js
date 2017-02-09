import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import { Row, Col } from 'react-grid-system'

class UpdateTask extends Component {
	updateTask = () => {
		const name = this.refs.taskText.getValue()
		this.props.handleUpdateTask(this.props.id, {name})
	}

	render(){
		const style = {
			borderBottom: "6px solid rgba(0,0,0,0.09803)"
		}
		return (
			<ListItem style={style} disabled={true} insetChildren={true}>
				<h2>Update task</h2>
				<Row>
					<Col md={10}>
						<TextField
				      hintText="Task name"
				      defaultValue={this.props.task.name}
				      ref="taskText"
				      onChange={this.updateTask}
				      fullWidth={true}
				    />
					</Col>
					<Col md={2}>
						<FlatButton label="Delete" secondary={true} />
					</Col>
				</Row>
			</ListItem>
		)
	}
}

export default UpdateTask