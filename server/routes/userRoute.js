import express from 'express'
import { signin, signup } from '../controllers/userControllers.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.post('/signin',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    signin)
router.post('/signup', signup)

export default router;