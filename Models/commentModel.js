import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Post'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
        text: String,
        votes:{
            type: Number,
            default: 0
        },
        downvotes: {
            type: Number,
            default: 0
        }
    }
)

export default mongoose.model('Comment', commentSchema);