import * as authServices from '../services/authServices.js';
import { successResponse, errorResponse } from '../utils/responseSending.js';

export async function registerUser(req, res) {
  const userData = req.body;
  try {
    const newUser = await authServices.registerUser(userData);
    successResponse(res, 'User registered successfully', newUser, 201);
  } catch (error) {
    errorResponse(res, 'Registration failed', 500);
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const authResult = await authServices.loginUser(email, password);
    if (authResult) {
      successResponse(res, 'Login successful', authResult, 200);
    } else {
      errorResponse(res, 'Invalid credentials', 401);
    }
  } catch (error) {
    errorResponse(res, 'Login failed', 500);
  }
}

