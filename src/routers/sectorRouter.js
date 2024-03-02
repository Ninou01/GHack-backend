import express from 'express';
import * as sectorController from '../controllers/sectorControllers.js';
import { verifyTokenMiddleware } from '../middleware/verifyToken.js'
import { attachUserToRequest } from '../middleware/attachUserToRequest.js'

const router = express.Router();

router.get('/sectors', verifyTokenMiddleware, attachUserToRequest, sectorController.getAllSectors);

router.get('/sectors/:id', verifyTokenMiddleware, attachUserToRequest, sectorController.getSectorById);

router.post('/sectors', verifyTokenMiddleware, attachUserToRequest, sectorController.createSector);

router.put('/sectors/:id', verifyTokenMiddleware, attachUserToRequest, sectorController.updateSector);

router.delete('/sectors/:id', verifyTokenMiddleware, attachUserToRequest, sectorController.deleteSector);

export default router;
