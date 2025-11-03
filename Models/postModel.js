import mongoose from 'mongoose'
import { POST_CATEGORY, POST_TYPE } from '../Utils/Constants.js';

const postSchema = new mongoose.Schema(
    {
        title: String,
        content: String,
        image: {
            type:String,
            default: ''
        },
        author: String,
        type: {
            type: String,
            enum: Object.values(POST_TYPE),
            default: POST_TYPE.COMIC
        },
        category: {
            type:String,
            enum: Object.values(POST_CATEGORY),
            default: POST_CATEGORY.DISCUSION
        },
        votes: {
            type: Number,
            default: 0
        },
        downvotes: {
            type: Number,
            default: 0
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
        }],
        postDate: String,
        votedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }

        ],
        downvotedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }

        ]
    }
);

export default mongoose.model('Post', postSchema);