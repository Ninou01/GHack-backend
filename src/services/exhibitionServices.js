import prisma from '../config/prisma.js';

export async function getAllExhibitions() {
  return prisma.exhibition.findMany();
}

export async function getExhibitionById(exhibitionId) {
  return prisma.exhibition.findUnique({
    where: { id: exhibitionId },
  });
}

export async function createExhibition(exhibitionData) {
  return prisma.exhibition.create({
    data: exhibitionData,
  });
}

export async function updateExhibition(exhibitionId, updatedExhibitionData) {
  return prisma.exhibition.update({
    where: { id: exhibitionId },
    data: updatedExhibitionData,
  });
}

export async function deleteExhibition(exhibitionId) {
  return prisma.exhibition.delete({
    where: { id: exhibitionId },
  });
}
