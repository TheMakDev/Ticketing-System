import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controller/userController.js';

const userRouter = express.Router();

// Endpoint to get user data, with userAuth middleware applied to ensure authentication
userRouter.get('/data', userAuth, getUserData);

export default userRouter;
