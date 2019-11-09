import React, { useState } from 'react'
import useForm from 'react-hook-form'
import { Redirect, withRouter } from 'react-router-dom'
import { fetchData } from '../helpers'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN_USER } from '../store/constants'
import Alert from '../components/Alert'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import FormHelperText from '@material-ui/core/FormHelperText'
import Link from '@material-ui/core/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

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

const Login = props => {
	const [redirect, setRedirect] = useState(false)
	const [error, setError] = useState('')

	const { location } = props
	const [afterRegister, setAfterRegister] = useState(
		location.state && location.state.afterRegister)

	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const { register, handleSubmit, errors } = useForm()

	const onSubmit = data => {
		return fetchData('/api/auth/login', 'POST', data)
			.then(data => {
				setError('')
				localStorage.setItem('token', data.data.token)
				dispatch({ type: LOGIN_USER, payload: data.data})
				setRedirect(true)
			})
			.catch(async (err) => {
				const errData = await err.response.json()
				setError(errData.message)
			})
	}

	const classes = useStyles()

	return (
		<Container component="main" maxWidth="xs">
			{redirect && <Redirect push to={'/u/'+user.username}/>}
			<Alert variant="success" 
				message="Registration Successful"
				open={afterRegister}
				handleClose={(e, reason) => reason === 'clickaway' || setAfterRegister(false)}
			/>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
					<TextField 
						label="Username" id="username" name="username"
						{...errors.username && {error:true}}
						helperText={errors.username && errors.username.message}
						inputRef={register({ required: 'Required' })}
						autoFocus
					/>
					<TextField type="password"
						label="Password" id="password" name="password"
						{...errors.password && {error:true}}
						helperText={errors.password && errors.password.message}
						inputRef={register({ required: 'Required' })}
					/>
					{error && <FormHelperText error>{error}</FormHelperText>}
					<Button
						type="submit"
						fullWidth variant="contained" color="primary"
						className={classes.submit}>
						Login
					</Button>
					<div className={classes.linkContainer}>
						<Link className={classes.link} href="/register" variant="body2">
							{'Don\'t have an account? Register'}
						</Link>
					</div>
				</form>
			</div>
		</Container>
	)
}

export default withRouter(Login)
