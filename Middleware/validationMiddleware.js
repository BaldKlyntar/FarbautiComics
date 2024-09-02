import { body, param, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../Errors/customErrors.js'
import { PRODUCT_CATEGORY } from '../Utils/Constants.js'
import mongoose from 'mongoose'
import Product from '../Models/productModel.js'
import User from '../Models/userModel.js'

const withValidationErrors = (validateValues) =>{
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errorMessages = errors.array().map((error) => error.msg);
            if(errorMessages[0].startsWith('no product')){
                throw new NotFoundError(errorMessages)
            }
            if(errorMessages[0].startsWith('not authorized')){
                throw new UnauthorizedError('not authorized to access this route')
            }
            throw new BadRequestError(errorMessages);
        }
        next();
    }]
}

export const validateProductInput = withValidationErrors([
    body('title').notEmpty().withMessage('title is required'),
    body('price').notEmpty().withMessage('price is required'),
    body('image').notEmpty().withMessage('image is required'),
    body('category').isIn(Object.values(PRODUCT_CATEGORY)).withMessage('invalid category value'),
    body('artistWriter').notEmpty().withMessage('artist/writer is required'),
    body('coverArtist').notEmpty().withMessage('cover artist is required'),
    body('publisher').notEmpty().withMessage('publisher is required'),
    body('countryManufacture').notEmpty().withMessage('country manufacture is required'),
    body('language').notEmpty().withMessage('language is required'),
    body('style').notEmpty().withMessage('style is required'),
    body('genre').notEmpty().withMessage('genre is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('format').notEmpty().withMessage('format is required'),
    body('type').notEmpty().withMessage('type is required'),
]);

export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if(!isValidId) throw new BadRequestError('invalid MongoDB id')
      const product = await Product.findById(value)
  
      if(!product) throw new NotFoundError(`no product with id ${value}`)
      
    })
  ])

  export const validateRegisterInput = withValidationErrors([

    body('name').notEmpty().withMessage('name is required'),
    body('username').notEmpty().withMessage('username is required'),
    body('email').notEmpty().withMessage('email is required').isEmail()
    .withMessage('invalid email format').custom(async(email) => {
      const user = await User.findOne({email})
      if(user){
        throw new BadRequestError('email already exists')
      }
  
    }),
    body('password').notEmpty().withMessage('password is required')
    .isLength({min:8}).withMessage('password must be at least 8 characters long '),
    body('address').notEmpty().withMessage('address is required'),
    body('lastName').notEmpty().withMessage('last name is required')
  ])

  export const validateLoginInput = withValidationErrors([

    body('email').notEmpty().withMessage('email is required').isEmail()
    .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required')
  ])

  export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail()
    .withMessage('invalid email format').custom(async(email, { req }) => {
      const user = await User.findOne({email})
      if(user && user._id.toString() !== req.user.userId){
        throw new BadRequestError('email already exists')
      }
  
    }),
   
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required')
  ])
  

