import base from '../base'
import { getLoggedInUser } from './auth'

export function addTask (listId, obj) {
	const uid = getLoggedInUser()
	if(uid){
		var task = base.push(`${uid}/lists/${listId}/tasks`, {
	    data: obj,
	    then(err){
	      if(err){ console.log(err)}
	    }
		})
		//available immediately, you don't have to wait for the callback to be called
		return task
	}
	return false
}

export function taskTemplate ({
	name, 
	completed = false, 
	created_at = Date.now()
})
{
	return { name, completed, created_at}
}

export function updateTask (listId, taskId, obj) {
	const uid = getLoggedInUser()
 	base.update(`${uid}/lists/${listId}/tasks/${taskId}`, {
    data: obj
  }).then(() => {
    // what to do on success?
  }).catch(err => {
    console.log(err)
  })
}

export function deleteTask (listId, taskId) {
	const uid = getLoggedInUser()
	base.remove(`${uid}/lists/${listId}/tasks/${taskId}`).then(() => {
    // do stuff
  }).catch(error => {
    console.log(error)
  })
}