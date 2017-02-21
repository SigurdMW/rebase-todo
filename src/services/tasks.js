import base from '../base'

export function addTask (uid, listId, obj) {
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

export function updateTask (uid, listId, taskId, obj) {
 	base.update(`${uid}/lists/${listId}/tasks/${taskId}`, {
    data: obj
  }).then(() => {
    // what to do on success?
  }).catch(err => {
    console.log(err)
  })
}

export function deleteTask (uid, listId, taskId) {
	base.remove(`${uid}/lists/${listId}/tasks/${taskId}`).then(() => {
    // do stuff
  }).catch(error => {
    console.log(error)
  })
}