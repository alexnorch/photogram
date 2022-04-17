import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

export const signin = async (req, res) => {
    const errors  = validationResult(req)
    console.log(errors)
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (!existingUser) return res.status(400).json({ data: null, message: 'There is no user with this email adress ' })
    const match = await bcrypt.compare(password, existingUser.password)
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secretKey', { expiresIn: '1h' })

    if (match) {
        res.status(200).json({ result: existingUser, token })
    } else {
        res.status(400).json({ message: 'Invalid email or password' })
    }

    /* 
    Steps: 
    1) Check the email, maybe user with this email doesn't exists
    2) Check the password, but before we check, we need to unhash our password and compare them
    3) Create jwt token
    */
}

export const signup = async (req, res) => {
    /* 
    Steps: 
    1) Check if user is already exists
    2) Hash password
    3) Create jwt token
    */

    const { firstName, lastName, email, password, confirmPassword } = req.body
    const alreadyExists = await User.findOne({ email })

    try {

        if (alreadyExists) return res.status(400).json({ message: 'User already exists' })
        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match!" })

        const hashedPassword = await bcrypt.hash(password, 12)
        const createdUser = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, 'secretKey', { expiresIn: '1h' })
        res.status(200).json({ result: createdUser, token })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}