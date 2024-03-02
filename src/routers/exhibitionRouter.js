import express from 'express';
import * as exhibitionController from '../controllers/exhibitionControllers.js';
import { verifyTokenMiddleware } from '../middleware/verifyToken.js'
import { attachUserToRequest } from '../middleware/attachUserToRequest.js'

const router = express.Router();

router.get('/exhibitions', verifyTokenMiddleware, attachUserToRequest, exhibitionController.getAllExhibitions);

router.get('/exhibitions/:id', verifyTokenMiddleware, attachUserToRequest, exhibitionController.getExhibitionById);

router.post('/exhibitions', verifyTokenMiddleware, attachUserToRequest, exhibitionController.createExhibition);

router.put('/exhibitions/:id', verifyTokenMiddleware, attachUserToRequest, exhibitionController.updateExhibition);

router.delete('/exhibitions/:id', verifyTokenMiddleware, attachUserToRequest, exhibitionController.deleteExhibition);

export default router;
