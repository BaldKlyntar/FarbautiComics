import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema(
    {
        user_id:{
            type: Number
        },
        product_id:{
            type: Number
        },
        read: {
            type: Number,
            default: 0
        },
        favorite: {
            type: Number,
            default: 0
        },
        wishlist: {
            type: Number,
            default: 0
        },
        purchase: {
            type: Number,
            default: 0
        },
        view: {
            type: Number,
            default:0
        },
        score: Number

    }
)

interactionSchema.index({ user_id: 1, product_id: 1 }, { unique: true });
export default mongoose.model('Interaction', interactionSchema);