import { Router } from "express";
import { 
    getApplicationStats, 
    getCurrentUser, 
    updateUser,
    addFavorites,
    getFavorites,
    removeFavorites,
    addCart,
    getCart,
    removeCart,
    addRead,
    getRead,
    removeRead,
    addWishlist,
    getWishlist,
    removeWishlist
} from "../Controllers/userController.js";
import { validateUpdateUserInput } from '../Middleware/validationMiddleware.js';
import { authorizePermissions } from '../Middleware/authMiddleware.js';

const router = Router()

router.get('/profile', getCurrentUser);
router.get('/admin/app-stats', authorizePermissions('admin'), getApplicationStats);
router.patch('/edit-profile', validateUpdateUserInput, updateUser);

router.post('/addtofavorites/:id', addFavorites);
router.get('/getfavorites', getFavorites);
router.delete('/removefromfavorites/:id', removeFavorites);

router.post('/markasread/:id', addRead);
router.get('/getreadhistory', getRead);
router.delete('/removefromread', removeRead);

router.post('/addtowishlist/:id', addWishlist);
router.get('/getwishlist', getWishlist);
router.delete('/removefromwishlist', removeWishlist);

router.post('/addtocart', addCart);
router.get('/getcart', getCart);
router.delete('/removecart', removeCart);

export default router




