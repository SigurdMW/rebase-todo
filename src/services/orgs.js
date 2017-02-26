import base from '../base'

export function addOrg (name, owner) {
	var org = base.push('organizations', {
    data: {
    	name, 
    	owner,
    	members: {[owner]: true}
    },
    then(err){
      if(!err){
        var member = base.push(`members/${org.key}`, {
			  	data: [owner],
			  	then(err){
			  		// all good!
			  	}
			  })
      }
    }
  })
  return org.key
}