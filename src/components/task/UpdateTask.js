import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { ListItem } from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import { Row, Col } from 'react-grid-system'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

class UpdateTask extends Component {
	constructor(){
		super()

		this.state = {
			modalOpen: false
		}
	}

	updateTask = () => {
		const name = this.refs.taskText.getValue()
		this.props.handleUpdateTask(this.props.id, {name})
	}

	handleDeleteTask = () => {
		this.props.handleDeleteTask(this.props.id)
		this.setState({
			modalOpen: false
		})
	}

	confirmDelete = () => {
		this.setState({
			modalOpen: true
		})
	}

	handleModalClose = () => {
		this.setState({
			modalOpen: false
		})
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
						<FlatButton label="Delete" onTouchTap={(e) => {e.preventDefault();this.confirmDelete()}} secondary={true} />
					</Col>
	        <Dialog
	          title="Delete this task?"
	          actions={[
				      <FlatButton
				        label="Cancel"
				        primary={true}
				        onTouchTap={(e) => {e.preventDefault();this.handleModalClose()}}
				      />,
				      <RaisedButton
				      	label="DELETE TASK"
				        secondary={true}
				        keyboardFocused={true}
				        onTouchTap={(e) => {e.preventDefault();this.handleDeleteTask()}} />,
				    ]}
	          modal={false}
	          open={this.state.modalOpen}
	          onRequestClose={this.handleModalClose}
	        >
	          Are you sure you want to delete the task "{this.props.task.name}"?
	        </Dialog>
				</Row>
			</ListItem>
		)
	}
}

export default UpdateTask