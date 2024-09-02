import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name:String,
        lastName:String,
        username:String,
        email:String,
        password:String,
        favorites:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }],
        wishlist:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }],
        readHistory:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }],
        cartData:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }],
        address:{
            type:String,
            default:"my city"
        },
        role:{
            type:String,
            enum:['user', 'admin'],
            default:'user',
        }
    }
);

userSchema.methods.toJSON = function(){
    let obj = this.toObject()
    delete obj.password
    return obj;
}

export default mongoose.model('User', userSchema);