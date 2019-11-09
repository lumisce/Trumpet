import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { fetchData } from './helpers'
import { LOGIN_USER, LOGOUT_USER } from './store/constants'
import GuestRoute from './components/GuestRoute'
import Login from './auth/Login'
import Register from './auth/Register'
import Profile from './user/Profile'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import deepOrange from '@material-ui/core/colors/deepOrange'

const App = () => {
	const dispatch = useDispatch()
	const [redirectLogin, setRedirectLogin] = useState(false)

	const loadUser = () => {
		const token = localStorage.getItem('token')
		if (!token) {
			return new Promise(() => false)
		}
		return fetchData('/api/auth/curr', 'GET', {}, {'Authorization': 'Bearer '+token})
			.then(data => {
				dispatch({ type: LOGIN_USER, payload: {...data.data, ...{token}}})
				return true
			})
			.catch(() => {
				localStorage.removeItem('token')
				dispatch({ type: LOGOUT_USER })
				setRedirectLogin(true)
				return false
			})
	}

	useEffect(() => {loadUser()}, [])

	const [authenticated, setAuthenticated] = useState(false)

	const verifyUser = () => {
		loadUser().then((a) => setAuthenticated(a))
	}

	const theme = createMuiTheme({
		palette: {
			primary: teal,
			secondary: {
				main: deepOrange['500']
			}
		},
		props: {
			MuiTextField: {
				variant: 'outlined',
				margin: 'normal',
				fullWidth: true,
			}
		}
	})

	return (
		<React.Fragment>
			<CssBaseline/>
			<ThemeProvider theme={theme}>
				<Switch>
					{redirectLogin && <Redirect to="/login"/>}
					<GuestRoute path="/register" authenticated={authenticated} 
						verifyUser={verifyUser}>
						<Register/>
					</GuestRoute>
					<GuestRoute path="/login" authenticated={authenticated} 
						verifyUser={verifyUser}>
						<Login />
					</GuestRoute>
					<Route path="/u/:username" component={Profile}/>
				</Switch>
			</ThemeProvider>
		</React.Fragment>
	)
}

export default App
