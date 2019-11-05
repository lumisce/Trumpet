import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import deepOrange from '@material-ui/core/colors/deepOrange'

const App = () => {
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
						<Route path="/register" component={Register}/>
						<Route path="/login" component={Login}/>
					</Switch>
				</div>
			</ThemeProvider>
		</React.Fragment>
	)
}

export default App
