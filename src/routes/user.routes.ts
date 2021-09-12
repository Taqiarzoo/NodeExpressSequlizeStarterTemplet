import { Router } from 'express';
import userController from '../controllers/user.controller';
// import authJwt from '../middleware/authJwt';

export const UserRoutes = Router();

// UserRoutes.get('/wallet', authJwt.VerifyUser, userController.GetWallet);
// UserRoutes.get('/transaction', authJwt.VerifyUser, userController.getTransactions);
// UserRoutes.get('/rooms', authJwt.VerifyUser, userController.getRooms);

