import express from 'express';
import * as authControllers from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', authControllers.registerUser);

router.post('/login', authControllers.loginUser);


export default router;
