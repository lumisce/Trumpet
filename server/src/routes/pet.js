import PetController from '../controllers/pet'
import express from 'express'
import { 
	validate,
	trumpetInteractionValidation,
} from '../middleware/validation'
import { verifyToken } from '../middleware/auth'

let router = express.Router()

router.get('/', PetController.getPets)
router.get('/drafts', verifyToken, PetController.getDraftPets)

router.post('/', verifyToken, PetController.createPet)
router.post('/like', trumpetInteractionValidation(), validate, 
	verifyToken, PetController.interactPet)
router.post('/bookmark', trumpetInteractionValidation(), validate, 
	verifyToken, PetController.interactPet)


module.exports = router
