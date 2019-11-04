import {
	LOGIN_USER
} from './constants'

export const userPostFetch = user => {
	return dispatch => {
		console.log(JSON.stringify(user))
		return fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then(resp => resp.json())
			.then(resp => {
				if (!resp.ok) {
					console.log(resp)
					throw Error(resp)
				}
				return resp
			})
			.then(data => {
				localStorage.setItem('token', data.token)
				dispatch(loginUser(data.user))
			})
			.catch(err => {
				if (err.errors) {
					console.log(err.errors)
				}
			})
	}
}

const loginUser = user => ({
	type: LOGIN_USER,
	payload: user
})