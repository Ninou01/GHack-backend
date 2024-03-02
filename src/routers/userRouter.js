import express from 'express';
import * as userController from '../controllers/userControllers.js';
import { verifyTokenMiddleware } from '../middleware/verifyToken.js'
import { attachUserToRequest } from '../middleware/attachUserToRequest.js'

const router = express.Router();

router.get('/users', verifyTokenMiddleware, attachUserToRequest, userController.getAllUsers);

router.get('/users/:id', verifyTokenMiddleware, attachUserToRequest, userController.getUserById);

router.post('/users', verifyTokenMiddleware, attachUserToRequest, userController.createUser);

router.put('/users/:id', verifyTokenMiddleware, attachUserToRequest, userController.updateUser);

router.delete('/users/:id', verifyTokenMiddleware, attachUserToRequest, userController.deleteUser);

export default router;
