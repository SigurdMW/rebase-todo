import React, { Component } from 'react'
import { Container } from 'react-grid-system'

class MainFooter extends Component {
	render(){
		const footerStyle = {
		  backgroundColor: '#ededed',
		  padding: '3rem 0',
		  marginTop: '2rem'
		};
		return (
			<footer style={footerStyle}>
				<Container fluid={true}>
					<p>Test</p>
				</Container>
			</footer>
		)
	}
}

export default MainFooter