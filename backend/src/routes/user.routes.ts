import express from 'express';
import { registerUser, loginUser, getUserParkings } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/:email/parkings', getUserParkings);