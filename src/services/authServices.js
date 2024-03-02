import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userServices from './userServices.js';

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET || 'default-secret-key';

export async function registerUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  const newUser = await userServices.createUser({
    ...userData,
    password: hashedPassword,
  });
  return newUser;
}

export async function loginUser(email, password) {
  const user = await userServices.getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  const token = generateToken(user.id);

  return { user, token };
}

export function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}
