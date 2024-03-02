import * as userServices from '../services/userServices.js';

export async function attachUserToRequest(req, res, next) {
  const userId = req.userId; 

  if (userId) {
    try {
      const user = await userServices.getUserById(userId);

      if (user) {
        req.user = user;
      }
    } catch (error) {
        errorResponse(res, error.message, 500);
    }
  }

  next();
}
