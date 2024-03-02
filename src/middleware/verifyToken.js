import { verifyToken } from '../services/authServices.js'
import { errorResponse } from '../utils/responseSending.js'

export function verifyTokenMiddleware(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return errorResponse(res, 'Token not provided', 401);
    }
  
    const userId = verifyToken(token);
  
    if (userId) {
      req.userId = userId; // Attach the userId to the request for later use
      next();
    } else {
      errorResponse(res, 'Invalid token', 401);
    }
}