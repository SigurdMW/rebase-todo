import base from '../base'

export function logout (_this, router) {
	base.unauth();
	removeLoginDataFromLS();
	router.props.router.replace('/login');
}