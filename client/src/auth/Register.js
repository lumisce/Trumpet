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
				<h1 className="header-1 text-center">Register</h1>
				<form className="w-full max-w-sm" onSubmit={this.handleSubmit}>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="form-label md:text-right md:mb-0">Username</label>
						</div>
						<div className="md:w-2/3">
							<input className="input-text"
								type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="form-label md:text-right md:mb-0">Email</label>
						</div>
						<div className="md:w-2/3">
							<input className="input-text"
								type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="form-label md:text-right md:mb-0">Password</label>
						</div>
						<div className="md:w-2/3">
							<input className="input-text"
								type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
							<label className="form-label md:text-right md:mb-0">Retype Password</label>
						</div>
						<div className="md:w-2/3">
							<input className="input-text"
								type="password" name="passwordConfirmation" placeholder="Retype Password" value={this.state.passwordConfirmation} onChange={this.handleChange}/>
						</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3"></div>
						<div className="md:w-2/3">
							<button className="btn btn-primary" type="submit">Register</button>
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