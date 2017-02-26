import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import { Row, Col } from 'react-grid-system'

class NewOrgForm extends Component {
	
	handleSubmit = (e) => {
		e.preventDefault()
		const { orgName } = this.refs
		this.props.addNewOrg(orgName.getValue())
	}

	render(){
		return (
			<Row>
				<Col md={6}>
					<h1>New Org Form</h1>
					<form onSubmit={this.handleSubmit}>
						{
							this.props.error &&
							 <Snackbar
			          open={true}
			          message={this.props.error}
			          autoHideDuration={4000}
			        />
						}
						<TextField
				      floatingLabelText="Organization name"
				      type="text"
				      ref="orgName"
				      autoFocus={true}
				    />
				    <br />
				    <br /> 
						<RaisedButton label="Create" type="submit" primary={true} />
						<br />
					</form>
				</Col>
			</Row>
		)
	}
}

export default NewOrgForm