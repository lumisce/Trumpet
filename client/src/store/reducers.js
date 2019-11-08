import {
	LOGIN_USER
} from './constants'

const initialState = {
	user: {},
	token: ''
}

export default function reducer(state=initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			return {...state, user: action.payload.user, token: action.payload.token}
		default:
			return state
	}
}