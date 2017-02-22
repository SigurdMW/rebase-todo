import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { Card } from 'material-ui/Card'
import { Row, Col } from 'react-grid-system'
import { syncTodoLists, removeBaseSync } from '../../services/services'
import { addList } from '../../services/lists'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			lists: {},
			isLoading: true,
			isAuthUser: props.isAuthUser || false,
			authUser: props.authUser || {}
		}
	}

	syncAuthPropsToState = (isAuthUser, authUser) => {
		this.setState({
  		isAuthUser: isAuthUser,
  		authUser: authUser
  	})
  	syncTodoLists(this, authUser.uid)
	}

	componentDidMount(){
		if(this.props.isAuthUser){
			this.syncAuthPropsToState(
				this.props.isAuthUser,
				this.props.authUser
			)
		}
	}

	componentWillReceiveProps(nextProps, nextState){
		if(this.state.isAuthUser !== nextState.isAuthUser){
			this.syncAuthPropsToState(
				nextProps.isAuthUser,
				nextProps.authUser
			)
		}
	}

	componentWillUnmount(){
		if(this.state.isAuthUser){
			removeBaseSync(this)
		}
	}

	handleAddList = (e) => {
		e.preventDefault()
		const newList = {title: this.refs.listTitle.getValue()}
		addList(this.props.authUser.uid,newList)
		this.refs.listTitle.getInputNode().value = ""
	}

	goToList = (key, list) => {
		this.props.router.push({
			pathname: `/lists/${key}`,
  		state: { list, key }
		})
	}

	renderLists = (key, index) => {
		const list = this.state.lists[key]
		const todoLength = (list.tasks) ? Object.keys(list.tasks).length : 0;
		var secondaryText = ""

		if(todoLength === 1){
			secondaryText = "1 todo"
		} else {
			secondaryText = `${todoLength} todos`
		}

		return (
			<ListItem
				key={key}
        primaryText={list.title}
        secondaryText={secondaryText}
        insetChildren={false}
        onTouchTap={(e) => {e.preventDefault();this.goToList(key, list)}}
        //onClick={() => this.goToList(key, list)}
       />
		)
	}

	render(){
		const lists = this.state.lists
		const { isLoading } = this.state
		const loaderStyle = {
			paddingLeft: "16px"
		}
		const noListsOrLoading = (!isLoading && Object.keys(lists).length === 0) ? true : false;
		return (
			<div>
				<h1>My lists</h1>
				<form onSubmit={this.handleAddList}>
					<TextField
			      floatingLabelText="Add list"
			      ref="listTitle"
			    />
			    <RaisedButton label="Add list" primary={true} type="submit" />
				</form>
				<p>Here are your todo-lists:</p>
				<Row>
	      		<Col md={6}>
			      	<Card>
				      	<List>
								<Subheader>All your todo-lists</Subheader>
								{isLoading && 
				      		<CircularProgress style={loaderStyle} />
				      	}
				      	{noListsOrLoading &&
				      		<Subheader>You have no lists:(</Subheader>
				      	}
			        	{
									Object
										.keys(lists)
										.map(this.renderLists)
								}
				      	</List>
				      </Card>
				     </Col>
				    </Row>
			</div>
		)
	}
}

export default Home