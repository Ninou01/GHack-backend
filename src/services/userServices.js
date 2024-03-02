import prisma from "../config/prisma.js";

export async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
}

export async function getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
}

export async function createUser(userData) {
    const newUser = await prisma.user.create({
      data: userData,
    });
}

export async function updateUser(userId, updatedUserData) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedUserData,
    });
    return updatedUser;
}

export async function deleteUser(userId) {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deletedUser;
}

