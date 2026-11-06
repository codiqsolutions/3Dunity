import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { sendError } from '../utils/responseHelper';
import { User, IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return sendError(res, 'Authentication token missing or malformed', 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string; role: string };
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return sendError(res, 'User associated with this token not found', 401);
    }
    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired authentication token', 403);
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return sendError(res, 'Admin privileges required to access this resource', 403);
  }
  next();
};

