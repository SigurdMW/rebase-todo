import base from '../base'
import { browserHistory } from 'react-router'

export function getLoggedInUser(){
	const user = JSON.parse(localStorage.getItem("user"))
	return (user) ? user.uid : null;
}

function removeLoggedInUser(){
	localStorage.removeItem("user")
}

export function logOutUser () {
	base.unauth()
	removeLoggedInUser()
	browserHistory.push('/login');
}

export function isAuthUser () {
	const user = localStorage.getItem("user")
	return (user) ? true : false
}

function authDataCallback(user) {
  if (user) {
    return user
  } 
  return null
}

export function getUser(){
	// Listen to authentication
	base.onAuth(authDataCallback)
}