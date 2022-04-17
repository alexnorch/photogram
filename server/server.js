import express from 'express'
import mongoose from 'mongoose'
import blogRoute from './routes/blogRoute.js'
import userRoute from './routes/userRoute.js'

const app = express()
const port = 5000
const url = 'mongodb+srv://admin:F0xlt49aZuPFfUuc@cluster0.0mnce.mongodb.net/bloger?retryWrites=true&w=majority'

// Why we shoul use this line of code?
app.use(express.json())

app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})

mongoose.connect(url)
    .then(() => console.log('Successfully connected to DB'))
    .catch(err => console.log(err))