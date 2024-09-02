import { StatusCodes } from "http-status-codes";
import User from '../Models/userModel.js'
import Product from '../Models/productModel.js'

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id: req.user.userId})
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({user: userWithoutPassword})

}

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments()
    const product = await Product.countDocuments();
    res.status(StatusCodes.OK).json({users, product})
}

export const updateUser = async (req, res) => {
    const obj = {...req.body};
    delete obj.password
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj)
    res.status(StatusCodes.OK).json({msg: 'update user'})
}

export const addFavorites = async (req, res) => {
    let user = await User.findById(req.user.userId);
    let product = await Product.findOne({ id: req.params.id });

    if (!user.favorites.includes(product._id)) {
        user.favorites.push(product._id);
        product.hearts += 1;
        await user.save();
        await product.save();

        res.status(StatusCodes.OK).json({msg: 'product added to favorites'})

    }
    else {
        user.favorites.remove(product._id);
        product.hearts -=1
        await user.save();
        await product.save();
        res.status(StatusCodes.OK).json({msg: 'product removed from favorites'})
    }

    



}


export const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('favorites');
        res.status(StatusCodes.OK).json({ favorites: user.favorites });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error retrieving favorites', error });
    }


}


export const addRead = async (req, res) => {

    let user = await User.findById(req.user.userId);
    let product = await Product.findOne({ id: req.params.id });

    if (!user.readHistory.includes(product._id)) {
        user.readHistory.push(product._id);
        await user.save();

        res.status(StatusCodes.OK).json({msg: 'product added to Library'})

    }
    else {
        user.readHistory.remove(product._id);
        await user.save();
        res.status(StatusCodes.OK).json({msg: 'product removed from Library'})
    }


}

export const getRead = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('readHistory');
        res.status(StatusCodes.OK).json({ readHistory: user.readHistory });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error retrieving Library', error });
    }


}

export const addWishlist = async (req, res) => {
    let user = await User.findById(req.user.userId);
    let product = await Product.findOne({ id: req.params.id });

    if (!user.wishlist.includes(product._id)) {
        user.wishlist.push(product._id);
        await user.save();

        res.status(StatusCodes.OK).json({msg: 'product added to Wishlist'})

    }
    else {
        user.wishlist.remove(product._id);
        await user.save();
        res.status(StatusCodes.OK).json({msg: 'product removed from Wishlist'})
    }


}

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('wishlist');
        res.status(StatusCodes.OK).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error retrieving Wishlist', error });
    }

}

export const removeFavorites = async ( req, res) => {

    let user = await User.findById(req.user.userId);
    let product = await Product.findOne({ id: req.params.id });


    if (user.favorites.includes(product._id)) {

        user.favorites.pop(product._id);
        product.hearts -=1
        await user.save();
        await product.save();

    }


    res.status(StatusCodes.OK).json({msg: 'product removed from favorites'})

}







export const removeRead = async ( req, res) => {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    const readIndex = user.readHistory.indexOf(productId);
    user.readHistory.splice(readIndex, 1);
    await user.save();
    res.status(StatusCodes.OK).json({msg: 'product removed from reading history'})

}



export const removeWishlist = async ( req, res) => {

    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    const wishIndex = user.wishlist.indexOf(productId);
    user.wishlist.splice(wishIndex, 1);
    await user.save();
    res.status(StatusCodes.OK).json({msg: 'product removed from wishlist'})

}

export const addCart = async (req, res) => {
    console.log("Added", req.body.productId)
    let userData = await User.findOne({_id:req.user.id})
    userData.cartData[req.body.productId] += 1
    await User.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
    res.status(StatusCodes.OK).json({msg: 'product added to cart'})

}

export const getCart = async (req, res) => {
    let userData = await User.findOne({_id:req.user.id});
    res.status(StatusCodes.OK).json(userData.cartData);


}

export const removeCart = async ( req, res) => {

    console.log("Removed", req.body.productId);
    let userData = await Users.findOne({_id:req.user.id});
    if (userData.cartData[req.body.productId]>0) {

        userData.cartData[req.body.productId] -= 1;
        
    }

    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.status(StatusCodes.OK).json({msg: 'product removed from cart'})

}

