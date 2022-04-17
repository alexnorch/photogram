import mongoose from "mongoose"

const schema = mongoose.Schema({
    title: String,
    message: String,
    category: String,
    author: String,
    image: String,
    tags: [String],
    likes: [String],
    createdAt: { type: Date, default: new Date() },
    comments: { type: [String], default: [] }
})

export default mongoose.model('Blog', schema)