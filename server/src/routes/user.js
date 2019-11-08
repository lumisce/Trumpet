import UserController from '../controllers/user'
import express from 'express'
import { 
	validate,
	getUsersValidation, 
	createUserValidation,
	validateUsername,
	validateEmail,
} from '../middleware/validation'

let router = express.Router()

router.get('/', getUsersValidation(), validate, UserController.getUsers)
router.post('/', createUserValidation(), validate, validateUsername, validateEmail, UserController.createUser)
router.post('/validate/username', validateUsername, (req, res) => {
	return res.status(200).json({
		message: 'Valid'
	})
})
router.post('/validate/email', validateEmail, (req, res) => {
	return res.status(200).json({
		message: 'Valid'
	})
})

module.exports = router