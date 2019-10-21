import UserController from '../controllers/user'
import express from 'express'
import { 
	validate,
	getUsersValidation, 
	createUserValidation,
} from '../middleware/validation'

let router = express.Router()

router.get('/', getUsersValidation(), validate, UserController.getUsers)
router.post('/', createUserValidation(), validate, UserController.createUser)

module.exports = router