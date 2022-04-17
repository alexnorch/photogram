import express from 'express'
import { getBlog, getAllBlogs, updateBlog, deleteBlog, createBlog, getRecommended } from '../controllers/blogsController.js'
const router = express.Router()


// Routes for posts
router.get('/', getAllBlogs)
router.get('/:id', getBlog)
router.patch('/:id', updateBlog)
router.delete('/:id', deleteBlog)
router.get('/recommended/:id', getRecommended)
router.post('/', createBlog)

export default router;

