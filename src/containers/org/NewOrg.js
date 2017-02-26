import React, { Component } from 'react'
import { addOrg } from '../../services/orgs'
import NewOrgForm from '../../components/org/NewOrgForm'

class NewOrg extends Component {
	constructor(){
		super()
		this.state = {
			error: null
		}
	}
	
	addNewOrg = (name) => {
		addOrg(name, this.props.authUser.uid)
	}

	render(){
		return (
			<NewOrgForm 
				addNewOrg={this.addNewOrg} 
				error={this.state.error}
			/>
		)
	}
}

export default NewOrg