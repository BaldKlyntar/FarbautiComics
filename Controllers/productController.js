import Product from '../Models/productModel.js'
import { StatusCodes } from 'http-status-codes'

export const getAllProducts = async (req, res) =>{
    const products = await Product.find({})
    res.status(StatusCodes.OK).json({products})
}

export const addProduct = async (req, res) =>{
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
}


export const getProduct = async (req, res) =>{
    const product = await Product.findById(req.params.id)
    res.status(StatusCodes.OK).json({ product })
}

export const getTrendingProducts = async (req, res) => {
    const trendingProducts = await Product.find().sort({ hearts: -1 }).limit(6);
    res.status(StatusCodes.OK).json({products: trendingProducts})
}

export const getRelatedProducts = async (req, res) => {
    const category = req.query.category
    let products = await Product.find({category:category});
    const maxIndex = products.length -1;
    const startIndex = Math.floor(Math.random() * (maxIndex - 6 + 1));
    const finishIndex = startIndex + 6;
    let related = products.slice(startIndex, finishIndex);
    res.status(StatusCodes.OK).json({products: related});
}

export const getNewProducts = async (req, res) => {
    let products = await Product.find({})
    let newProducts = products.slice(1).slice(-6)
    res.status(StatusCodes.OK).json({products: newProducts});
}

export const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })

    res.status(StatusCodes.OK).json({ msg: 'product modified: ', product: updatedProduct})
}

export const deleteProduct = async (req, res) => {
    const removedProduct = await Product.findByIdAndDelete(req.params.id)

    res.status(StatusCodes.OK).json({ msg: 'product deleted', product: removedProduct})
}

