import * as exhibitionService from '../services/exhibitionServices.js';
import { successResponse, errorResponse } from '../utils/responseSending.js';

export async function getAllExhibitions(req, res) {
  try {
    const exhibitions = await exhibitionService.getAllExhibitions();
    successResponse(res, 'Exhibitions retrieved successfully', exhibitions, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function getExhibitionById(req, res) {
  const exhibitionId = parseInt(req.params.id, 10);
  try {
    const exhibition = await exhibitionService.getExhibitionById(exhibitionId);
    if (!exhibition) {
      errorResponse(res, 'Exhibition not found', 404);
      return;
    }
    successResponse(res, 'Exhibition retrieved successfully', exhibition, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function createExhibition(req, res) {
  const exhibitionData = req.body;
  try {
    const newExhibition = await exhibitionService.createExhibition(exhibitionData);
    successResponse(res, 'Exhibition created successfully', newExhibition, 201);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function updateExhibition(req, res) {
  const exhibitionId = parseInt(req.params.id, 10);
  const updatedExhibitionData = req.body;
  try {
    const updatedExhibition = await exhibitionService.updateExhibition(exhibitionId, updatedExhibitionData);
    successResponse(res, 'Exhibition updated successfully', updatedExhibition, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function deleteExhibition(req, res) {
  const exhibitionId = parseInt(req.params.id, 10);
  try {
    const deletedExhibition = await exhibitionService.deleteExhibition(exhibitionId);
    successResponse(res, 'Exhibition deleted successfully', deletedExhibition, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}
