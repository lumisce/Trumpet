import AuthController from '../controllers/auth'
import express from 'express'
import { verifyToken } from '../middleware/auth'
import { loginValidation, validate } from '../middleware/validation'

let router = express.Router()

router.post('/login', loginValidation(), validate, AuthController.login)
router.get('/curr', verifyToken, AuthController.current)

module.exports = router