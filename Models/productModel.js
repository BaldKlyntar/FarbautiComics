import mongoose from "mongoose"
import { PRODUCT_CATEGORY, GENRE_CATEGORY } from '../Utils/Constants.js'
const { Schema, Types } = mongoose;

const ProductSchema = new mongoose.Schema(
    {
        productModel_id:{type: Number, unique: true},
        id:{
            type: Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        title:String,
        price:Number,
        image:String,
        imagePublicId:String,
        category: {
            type:String,
            enum: Object.values(PRODUCT_CATEGORY),
            default: PRODUCT_CATEGORY.MARVEL
        },
        artistWriter: {
            type:String,
            default:"unknown"
        },
        coverArtist:{
            type:String,
            default:"unknown"
        },
        publisher:{
            type:String,
            default:"unknown"
        },
        countryManufacture:{
            type:String,
            default:"unknown"
        },
        language:{
            type:String,
            default:"english"
        },
        style:{
            type:String,
            default:"color"
        },
        genre:{
            type:String,
            enum: Object.values(GENRE_CATEGORY),
            default: GENRE_CATEGORY.ACCION
        },
        format: {
            type:String,
            default: "TPB"
        },
        type: {
            type:String,
            default: "Graphic novel"
        },
        description:{
            type:String,
            default:"graphic novel"
        },
        available:{
            type:Boolean,
            default:true
        },
        hearts:{
            type:Number,
            default:0
        },

    },
    { timestamps: true}
);

export default mongoose.model("Product", ProductSchema);