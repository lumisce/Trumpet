import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { fetchData } from './helpers'
import { LOGIN_USER } from './store/constants'
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

	const loadUser = async () => {
		const token = localStorage.getItem('token')
		if (!token) {
			return
		}
		return fetchData('/api/auth/curr', 'GET', {}, {'Authorization': 'Bearer '+token})
			.then(data => {
				dispatch({ type: LOGIN_USER, payload: {...data.data, ...{token}}})
			})
			.catch(async () => {
				setRedirectLogin(true)
			})
	}

	useEffect(() => {loadUser()}, [])

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
				<div className="container mx-auto flex justify-center min-h-screen">
					<Switch>
						{redirectLogin && <Redirect to="/login"/>}
						<Route path="/register" component={Register}/>
						<Route path="/login" component={Login}/>
						<Route path="/u/:username" component={Profile}/>
					</Switch>
				</div>
			</ThemeProvider>
		</React.Fragment>
	)
}

export default App
