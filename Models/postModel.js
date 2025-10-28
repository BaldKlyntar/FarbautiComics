import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        title: String,
        content: String,
        image: String,
        author: {
            type:mongoose.Schema.Types.ObjectId, ref: 'User'
        },
        votes: {
            type: Number,
            default: 0
        }
    }
);

export default mongoose.model('Post', postSchema);