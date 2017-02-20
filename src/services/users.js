import base from '../base'

export function addUser (email, password, someCallBackFunction) {
	base.createUser({
	  email: email,
	  password: password
	}, someCallBackFunction);
}