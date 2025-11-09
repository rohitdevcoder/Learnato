import express from 'express';
import authUser from '../middleware/authUser.js';
import { isAuth, loginUser, registerUser } from '../controllers/authController.js';

const UserRouter = express.Router();

UserRouter.post('/register', registerUser)
UserRouter.post('/login', loginUser);
UserRouter.get('/is-auth',authUser,isAuth);

export default UserRouter;