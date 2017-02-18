import base from '../base'
import { getLoggedInUser } from './auth'

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