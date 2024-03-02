import * as sectorService from '../services/sectorServices.js';
import { successResponse, errorResponse } from '../utils/responseSending.js';

export async function getAllSectors(req, res) {
  try {
    const sectors = await sectorService.getAllSectors();
    successResponse(res, 'Sectors retrieved successfully', sectors, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function getSectorById(req, res) {
  const sectorId = parseInt(req.params.id, 10);
  try {
    const sector = await sectorService.getSectorById(sectorId);
    if (!sector) {
      errorResponse(res, 'Sector not found', 404);
      return;
    }
    successResponse(res, 'Sector retrieved successfully', sector, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function createSector(req, res) {
  const sectorData = req.body;
  try {
    const newSector = await sectorService.createSector(sectorData);
    successResponse(res, 'Sector created successfully', newSector, 201);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function updateSector(req, res) {
  const sectorId = parseInt(req.params.id, 10);
  const updatedSectorData = req.body;
  try {
    const updatedSector = await sectorService.updateSector(sectorId, updatedSectorData);
    successResponse(res, 'Sector updated successfully', updatedSector, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function deleteSector(req, res) {
  const sectorId = parseInt(req.params.id, 10);
  try {
    const deletedSector = await sectorService.deleteSector(sectorId);
    successResponse(res, 'Sector deleted successfully', deletedSector, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}
