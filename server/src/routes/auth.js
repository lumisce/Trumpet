import AuthController from '../controllers/auth'
import express from 'express'
import { verifyToken } from '../middleware/auth'

let router = express.Router()

router.post('/login', AuthController.login)
router.get('/curr', verifyToken, AuthController.current)

module.exports = router