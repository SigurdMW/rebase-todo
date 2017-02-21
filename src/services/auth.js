import base from '../base'
import { browserHistory } from 'react-router'

export function logOutUser () {
	base.unauth()
	browserHistory.push('/login');
}