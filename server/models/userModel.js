import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, default: 'https://unwomen.org.au/wp-content/uploads/2020/10/Avitar_Image_Placeholder.png' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
})

export default mongoose.model('User', schema)