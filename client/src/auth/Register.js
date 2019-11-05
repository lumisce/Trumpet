import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { fetchData } from '../helpers'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const Register = () => {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	})
	const [errors, setErrors] = useState({})
	const [redirect, setRedirect] = useState(false)

	const handleChange = event => {
		setUser({
			...user,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = event => {
		event.preventDefault()
		const newErrors = {}
		for (let prop in user) {
			if (!user[prop].length) {
				newErrors[prop] = 'Required'
			}
		}
		console.log('newError', newErrors)
		if (Object.entries(newErrors).length) {
			setErrors(newErrors)
			return
		}
		return fetchData('/api/users', 'POST', user)
			.then(() => {
				setRedirect()
			})
			.catch(async (err) => {
				if (err.status >= 500) {
					console.log('Something went wrong')
					return
				}
				let errData = await err.response.json()
				if (errData.errors) {
					console.log(errData.errors)
					setErrors(errData.errors)
				} else {
					console.log(errData.message)
				}
			})
	}

	const renderRedirect = () => {
		if (redirect) {
			return (
				<Redirect push to={{
					pathname: '/login',
					state: { afterRegister: true }
				}}/>
			)
		}
	}

	const useStyles = makeStyles(theme => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main
		},
		form: {
			width: '100%',
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
			padding: theme.spacing(1)
		},
		linkContainer: {
			width: '100%',
			display: 'flex',
			justifyContent: 'flex-end'
		},
		link: {
			display: 'block'
		}
	}))

	const classes = useStyles()

	return (
		<Container component="main" maxWidth="xs">
			{renderRedirect()}
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField 
						label="Username" id="username" name="username"
						required autoFocus
						onChange={handleChange}
						{...errors.username && {error:true}}
						helperText={errors.username}
					/>
					<TextField
						label="Email" id="email" name="email"
						required
						onChange={handleChange}
						{...errors.email && {error:true}}
						helperText={errors.email}
					/>
					<TextField
						label="Password" id="password" name="password"
						required
						onChange={handleChange}
						{...errors.password && {error:true}}
						helperText={errors.password}
					/>
					<TextField
						label="Retype Password"
						id="passwordConfirmation" name="passwordConfirmation"
						required
						onChange={handleChange}
						{...errors.passwordConfirmation && {error:true}}
						helperText={errors.passwordConfirmation}
					/>
					<Button
						type="submit"
						fullWidth variant="contained" color="primary"
						className={classes.submit}>
						Register
					</Button>
					<div className={classes.linkContainer}>
						<Link className={classes.link} href="/login" variant="body2">
							{'Have an account? Login'}
						</Link>
					</div>
				</form>
			</div>
		</Container>
	)
}

export default Register