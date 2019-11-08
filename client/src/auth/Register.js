import React, { useState } from 'react'
import useForm from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import { fetchData } from '../helpers'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const Register = () => {
	const [redirect, setRedirect] = useState(false)

	const { register, handleSubmit, watch, errors } = useForm()

	const onSubmit = data => {
		return fetchData('/api/users', 'POST', data)
			.then(() => {
				setRedirect(true)
			})
			.catch(async (err) => {
				const errData = await err.response.json()
				console.log(errData)
			})
	}

	const validateUsername = async (username) => {
		return fetchData('/api/users/validate/username', 'POST', {username})
			.catch(async (err) => {
				const errData = await err.response.json()
				return errData.errors.username
			})
	}

	const validateEmail = async (email) => {
		return fetchData('/api/users/validate/email', 'POST', {email})
			.catch(async (err) => {
				const errData = await err.response.json()
				return errData.errors.email
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
				<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
					<TextField 
						label="Username" id="username" name="username"
						{...errors.username && {error:true}}
						helperText={errors.username && errors.username.message}
						inputRef={register({
							required: 'Required',
							minlength: { value: 3, message: '3-32 characters required'},
							maxlength: { value: 32, message: '3-32 characters required'},
							pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Must be alphanumeric or _'} ,
							validate: async value => await validateUsername(value)
						})}
						autoFocus
					/>
					<TextField
						label="Email" id="email" name="email"
						{...errors.email && {error:true}}
						helperText={errors.email && errors.email.message}
						inputRef={register({
							required: 'Required',
							pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email'},
							validate: async value => await validateEmail(value)
						})}
					/>
					<TextField type="password"
						label="Password" id="password" name="password"
						{...errors.password && {error:true}}
						helperText={errors.password && '8-40 characters required'}
						inputRef={register({ required: true, minLength: 8, maxLength: 40 })}
					/>
					<TextField
						label="Retype Password" type="password"
						id="passwordConfirmation" name="passwordConfirmation"
						{...errors.passwordConfirmation && {error:true}}
						helperText={errors.passwordConfirmation && errors.passwordConfirmation.message}
						inputRef={register({
							required: 'Required',
							validate: value => value === watch('password') || 'Must match password'
						})}
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
