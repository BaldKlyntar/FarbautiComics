import { StatusCodes } from "http-status-codes";
import User from '../Models/userModel.js'
import { hashPassword, comparePassword } from '../Utils/passwordUtils.js'
import { UnauthenticatedError } from '../Errors/customErrors.js'
import { createJWT } from '../Utils/tokenUtils.js'

export const register = async (req, res) => {

    try {

        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser){
            return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Correo ya registrado'})
        }

        const isFirstAccount = await User.countDocuments() === 0;
        req.body.role = isFirstAccount ? 'admin' : 'user';

        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;

        const lastUser = await User.findOne().sort({ userModel_id: -1});
        const newId = lastUser ? lastUser.userModel_id + 1 : 1;

        const user = await User.create({
            ...req.body,
            userModel_id: newId
        });

        res.status(StatusCodes.CREATED).json({
            msg: 'Usuario registrado correctamente',
            userModel_id: user.userModel_id
        })
        
    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error al registrar el usuario'});
        console.log(error)
        
    }


}

export const login = async (req, res) => {
    const user = await User.findOne({email:req.body.email})
    if(!user) throw new UnauthenticatedError('invalid credentials')

    const isPasswordCorrect = await comparePassword(req.body.password, user.password)
    if(!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');

    const token = createJWT({userId:user._id, role:user.role})
    const oneDay = 1000 *60*60*24

    res.cookie('token', token,{
        httpOnly:true,
        expires: new Date(Date.now() + oneDay),
        secure:process.env.NODE_ENV === 'production',
    })

    res.status(StatusCodes.OK).json({ msg: 'user logged in' })

}

export const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly:true,
        expires: new Date(Date.now())
    });

    res.status(StatusCodes.OK).json({ msg: 'user logged out'})
}