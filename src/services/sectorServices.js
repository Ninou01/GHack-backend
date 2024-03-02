import prisma from '../config/prisma.js';

export async function getAllSectors() {
  return prisma.sector.findMany();
}

export async function getSectorById(sectorId) {
  return prisma.sector.findUnique({
    where: { id: sectorId },
  });
}

export async function createSector(sectorData) {
  return prisma.sector.create({
    data: sectorData,
  });
}

export async function updateSector(sectorId, updatedSectorData) {
  return prisma.sector.update({
    where: { id: sectorId },
    data: updatedSectorData,
  });
}

export async function deleteSector(sectorId) {
  return prisma.sector.delete({
    where: { id: sectorId },
  });
}
