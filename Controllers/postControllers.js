import Post from '../Models/postModel.js'
import Comment from '../Models/commentModel.js'
import StatusCodes from 'http-status-codes'
import User from '../Models/userModel.js'

export const addPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        const actualDate = new Date().toLocaleDateString()
        console.log(actualDate)
        const post = await Post.create({
            ...req.body,
            author: user.username,
            postDate: actualDate});
        res.status(StatusCodes.CREATED).json({ post })
        
    } catch (error) {

        res.status(StatusCodes.REQUEST_TIMEOUT)
        
    }
}

export const addComment = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        const post = await Post.findById(req.post.postId);
        const comment = await Comment.create({...req.body,
            post: post,
            user: user.username
        });
        post.comments.push(comment)
        await post.save();
        await comment.save();
        res.status(StatusCodes.CREATED).json({ comment })
        
    } catch (error) {

        res.status(StatusCodes.REQUEST_TIMEOUT)
        
    }
}

export const getAllComment = async (req, res) => {
    try {

        const comments = await Comment.find({}).sort({ createdAt: -1})
        res.status(StatusCodes.OK).json({ comments })
        
    } catch (error) {

        res.status(StatusCodes.REQUEST_TIMEOUT)
        
    }
    
}

export const getAllPosts = async (req, res) => {
    try {

        const posts = await Post.find({}).sort({ createdAt: -1})
        res.status(StatusCodes.OK).json({ posts })
        
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND)
        
    }
}

export const getPost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)
        res.status(StatusCodes.OK).json({ post })
        
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND)
    }
}