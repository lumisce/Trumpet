import {
	query, body, 
	validationResult,
	sanitizeBody
} from 'express-validator'
import UserService from '../services/user'

export const getUsersValidation = () => {
	return [
		query('page').optional().isInt().toInt(),
		query('limit').optional().isInt().toInt()
	]
}

export const validateUsername = async (req, res, next) => {
	const exists = await UserService.hasUsername(req.body.username)
	if (exists) {
		return res.status(422).json({
			errors: {
				username: 'Username exists'
			}
		})
	}
	next()
}

export const validateEmail = async (req, res, next) => {
	const exists = await UserService.hasEmail(req.body.email)
	if (exists) {
		return res.status(422).json({
			errors: {
				email: 'Email exists'
			}
		})
	}
	next()
}

export const createUserValidation = () => {
	return [
		body('username').isLength({min: 3, max: 32})
			.withMessage('3-32 characters required'),
		body('email').isEmail().withMessage('Valid email required'),
		body('password').isLength({min: 8, max: 40})
			.withMessage('8-40 characters required'),
		body('passwordConfirmation').not().isEmpty()
			.withMessage('Required')
			.custom((value, {req}) => value === req.body.password)
			.withMessage('Must match password')
	]
}

export const loginValidation = () => {
	return [
		body('username').not().isEmpty().withMessage('Required'),
		body('password').not().isEmpty().withMessage('Required')
	]
}

export const trumpetInteractionValidation = () => {
	return [
		body('id').isInt(),
		body('state').isBoolean(),
		sanitizeBody('id').toInt(),
		sanitizeBody('state').toBoolean()
	]
}

export const validate = (req, res, next) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		return next()
	}

	const compactErrors = {}
	errors.array().map(err => 
		compactErrors[err.param] = err.msg
	)

	return res.status(422).json({
		errors: compactErrors
	})
}