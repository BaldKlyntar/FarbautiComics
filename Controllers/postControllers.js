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
        const post = await Post.findById(req.params.id);
        console.log(req.body)
        const comment = await Comment.create({...req.body,
            post: post._id,
            user: user._id
        });
        post.comments.push(comment._id)
        await post.save();
        await comment.save();
        res.status(StatusCodes.CREATED).json({ comment })
        
    } catch (error) {

        console.log(error)

        res.status(StatusCodes.REQUEST_TIMEOUT).json({ error })
        
    }
}

export const getAllComment = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id)
        const comments = await Comment.find( { post: post._id}).populate('user', 'username')
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
        const user = await User.findById(req.user.userId)
        const post = await Post.findById(req.params.id)
        let hasDownVoted = post.downvotedBy.includes(user._id);
        let hasVoted =  post.votedBy.includes(user._id);

     
        const postFlag ={
            ...post.toObject(),
            hasVoted,
            hasDownVoted
        }
        

        res.status(StatusCodes.OK).json({ post: postFlag })
        
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND)
    }
}

export const votePost = async (req, res) => {
    try{
        const user = await User.findById(req.user.userId)
        const post = await Post.findById(req.params.id)

        if(post.downvotedBy.includes(user._id)) {
            post.downvotedBy.pull(user._id);
            post.downvotes -= 1;
        }


        if(post.votedBy.includes(user._id)){
            post.votes -= 1;
            post.votedBy.remove(user._id);
        }else{
            post.votes += 1;
            post.votedBy.push(user._id)
        }

        await post.save();
        res.status(StatusCodes.OK)
        

    } catch(error){
        console.log(error)

    }
}

export const downVotePost = async (req, res) => {

    try{
        const user = await User.findById(req.user.userId)
        const post = await Post.findById(req.params.id)

        if(post.votedBy.includes(user._id)) {
            post.votedBy.pull(user._id);
            post.votes -= 1;
        }


        if(post.downvotedBy.includes(user._id)){
            post.downvotes -= 1;
            post.downvotedBy.remove(user._id);
        }else{
            post.downvotes += 1;
            post.downvotedBy.push(user._id)
        }

        await post.save();
        res.status(StatusCodes.OK)
        

    } catch(error){
        console.log(error)

    }

}