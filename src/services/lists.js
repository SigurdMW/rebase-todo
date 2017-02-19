import base from '../base'
import { getLoggedInUser } from './auth'
import { browserHistory } from 'react-router'

export function addList (obj) {
	const uid = getLoggedInUser();
	if(uid){
		var list = base.push(`${uid}/lists`, {
	    data: obj,
	    then(err){
	      //if(!err){} what to do?
	    }
		});
		//available immediately, you don't have to wait for the callback to be called
		return list
	}
	return false
}

export function deleteList (key) {
	const uid = getLoggedInUser()
	if(uid){
		base.remove(`${uid}/lists/${key}`).then(() => {
	    browserHistory.push("/")
	  }).catch(error => {
	    //handle error
	  })
	}
}