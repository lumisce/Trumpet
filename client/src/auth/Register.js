import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userPostFetch } from '../store/actions'

class Register extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordConfirmation: ''
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.userPostFetch(this.state)
	}

	render() {
		return (
			<div className="m-6">
				<h1 className="block text-teal-600 text-center text-2xl font-bold mb-4">Register</h1>
				<form className="w-full max-w-sm" onSubmit={this.handleSubmit}>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Username</label>
						</div>
						<div className="md:w-2/3">
							<input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
								type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Email</label>
						</div>
						<div className="md:w-2/3">
							<input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
								type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Password</label>
						</div>
						<div className="md:w-2/3">
							<input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
								type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Retype Password</label>
						</div>
						<div className="md:w-2/3">
							<input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
								type="password" name="passwordConfirmation" placeholder="Retype Password" value={this.state.passwordConfirmation} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3"></div>
						<div className="md:w-2/3">
							<button className="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Register</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Register)