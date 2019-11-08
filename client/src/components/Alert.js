import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import InfoIcon from '@material-ui/icons/Info'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import SnackBar from '@material-ui/core/SnackBar'
import SnackBarContent from '@material-ui/core/SnackBarContent'
import { amber, green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const variantIcon = {
	success: CheckCircleIcon,
	error: ErrorIcon,
	warning: WarningIcon,
	info: InfoIcon
}

const useStyles = makeStyles(theme => ({
	success: {
		backgroundColor: green[600]
	},
	error: {
		backgroundColor: theme.palette.error.dark
	},
	info: {
		backgroundColor: theme.palette.primary.main
	},
	warning: {
		backgroundColor: amber[700]
	},
	icon: {
		fontSize: 20
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1)
	},
	message: {
		display: 'flex',
		alignItems: 'center'
	}

}))

const Alert = (props) => {
	const { className, message, variant, open, handleClose, ...other } = props
	const Icon = variantIcon[variant]
	const classes = useStyles()

	return (
		<SnackBar open={open}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<SnackBarContent aria-describedby="snackbar-content"
				className={className ? classes[variant]+' '+className : classes[variant]}
				message={
					<span id="snackbar-content" className={classes.message}>
						<Icon className={classes.icon+' '+classes.iconVariant}/>
						{message}
					</span>
				}
				action={[
					<IconButton key="close" aria-label="close" 
						color="inherit" onClick={handleClose}>
						<CloseIcon className={classes.icon}/>
					</IconButton>
				]}
				{...other}
			/>
		</SnackBar>
	)

}

export default Alert
