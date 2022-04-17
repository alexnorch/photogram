import mongoose from 'mongoose'
import Blog from '../models/blogModel.js'


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)


    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getRecommended = async (req, res) => {
    const { id } = req.params

    try {
        const recommendedBlogs = await Blog.find({ '_id': { $ne: id } }).skip(2)
        res.status(200).json(recommendedBlogs)
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getBlog = async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findById(id)
        res.status(200).json(blog)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateBlog = async (req, res) => {
    const userData = req.body
    const { id } = req.query

    try {
        // I'm not about this line of code
        const updatedBlog = await Blog.findOneAndUpdate(id, userData, { new: true })
        res.status(200).json(updatedBlog)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createBlog = async (req, res) => {
    
    try {
        const blog = await Blog.create(req.body)
        blog.save()
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.query

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'There is no blog with this ID' })

    try {
        await Blog.findByIdAndDelete(id)
        res.status(200).json(null)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}