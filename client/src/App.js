import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'

class App extends Component {
	render() {
		return (
			<div className="container mx-auto flex justify-center min-h-screen">
				<Switch>
					<Route path="/register" component={Register}/>
					<Route path="/login" component={Login}/>
				</Switch>
			</div>
		)
	}
}

export default App
