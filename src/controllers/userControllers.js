import * as userService from '../services/userServices.js';
import { successResponse, errorResponse } from '../utils/responseSending.js';

export async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    successResponse(res, 'Users retrieved successfully', usersWithoutPassword, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function getUserById(req, res) {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      errorResponse(res, 'User not found', 404);
      return;
    }
    const { password, ...userWithoutPassword } = user;
    successResponse(res, 'User retrieved successfully', userWithoutPassword, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function createUser(req, res) {
  const userData = req.body;
  try {
    const newUser = await userService.createUser(userData);
    const { password, ...userWithoutPassword } = newUser;
    successResponse(res, 'User created successfully', userWithoutPassword, 201);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function updateUser(req, res) {
  const userId = parseInt(req.params.id, 10);
  const updatedUserData = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, updatedUserData);
    const { password, ...userWithoutPassword } = updatedUser;
    successResponse(res, 'User updated successfully', userWithoutPassword, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}

export async function deleteUser(req, res) {
  const userId = parseInt(req.params.id, 10);
  try {
    const deletedUser = await userService.deleteUser(userId);
    const { password, ...userWithoutPassword } = deletedUser;
    successResponse(res, 'User deleted successfully', userWithoutPassword, 200);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
}
