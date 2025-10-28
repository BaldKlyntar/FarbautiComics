import { StatusCodes } from "http-status-codes";
import User from '../Models/userModel.js'
import Product from '../Models/productModel.js'
import { registerInteraction } from "../Utils/Interactions.js";
import axios from 'axios'

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
        let userModelId = Number(user.userModel_id);
        let productModelId = Number(product.productModel_id);
        registerInteraction(userModelId, productModelId, 'favorite');

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

export const removeFavorites = async ( req, res) => {
    try{

        let user = await User.findById(req.user.userId);
        let product = await Product.findOne({ id: req.params.id });

        user.favorites.remove(product._id);
        product.hearts -= 1;
        await user.save();
        await product.save()
        res.status(StatusCodes.OK).json({msg: 'product removed from favorites'})

    } catch ( error ){
        console.log(error)
    }


}

export const userView = async (req, res) => {

  try{
    let user = await User.findById(req.user.userId);
    let product = await Product.findOne({id: req.params.id});

    let userModelId = Number(user.userModel_id);
    let productModelId = Number(product.productModel_id);

    await registerInteraction(userModelId, productModelId, 'view');
    
    res.status(StatusCodes.OK)

  } catch(error){
    return error;

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
        let userModelId = Number(user.userModel_id);
        let productModelId = Number(product.productModel_id);
        registerInteraction(userModelId, productModelId, 'read');
        res.status(StatusCodes.OK).json({msg: 'product added to Library'})

    }
    else {
        user.readHistory.remove(product._id);
        await user.save();
        res.status(StatusCodes.OK).json({msg: 'product removed from Library'})
    }


}

export const removeRead = async ( req, res) => {

    try{

        let user = await User.findById(req.user.userId);
        let product = await Product.findOne({ id: req.params.id });

        user.readHistory.remove(product._id);
        await user.save();
        res.status(StatusCodes.OK).json({msg: 'product removed from read'})

    } catch ( error ){
        console.log(error)
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
        let userModelId = Number(user.userModel_id);
        let productModelId = Number(product.productModel_id);
        registerInteraction(userModelId, productModelId, 'wishlist');
        res.status(StatusCodes.OK).json({msg: 'Product added to Wishlist'})

    }
    else {
        user.wishlist.remove(product._id);
        await user.save();
        res.status(StatusCodes.OK).json({msg: 'product removed from Wishlist'})
    }

}

export const removeWishlist = async ( req, res) => {

    try{

        let user = await User.findById(req.user.userId);
        let product = await Product.findOne({ id: req.params.id });

        user.wishlist.remove(product._id);
        await user.save();
        res.status(StatusCodes.OK).json({msg: 'product removed from read'})

    } catch ( error ){
        console.log(error)
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

export const addCart = async (req, res) => {


}

export const getCart = async (req, res) => {

}

export const getRecommendedComics = async (req, res) => {

  try {

      let user = await User.findById(req.user.userId);
      const user_id = Number(user.userModel_id)

      const flaskResponse = await axios.post("http://localhost:3100/recommend",{
        user_id
      })


      const recommendations = flaskResponse.data.recommendations  || [];
      const products = await Product.find({title: {$in: recommendations}})

      res.status(StatusCodes.OK).json({
        user_id,
        products,
      })
    
  } catch (error) {

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message})
    
  }





};


export const removeCart = async ( req, res) => {

}

