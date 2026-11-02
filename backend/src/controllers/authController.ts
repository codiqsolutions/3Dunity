import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config/env';
import { sendSuccess, sendError } from '../utils/responseHelper';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, company, phone } = req.body;

      if (!name || !email || !password) {
        return sendError(res, 'Name, email, and password are required', 400);
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return sendError(res, 'User with this email already exists', 409);
      }

      const user = new User({
        name,
        email: email.toLowerCase(),
        password,
        company,
        phone,
      });

      await user.save();

      const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      return sendSuccess(
        res,
        {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            company: user.company,
          },
        },
        'Registration successful',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return sendError(res, 'Email and password are required', 400);
      }

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return sendError(res, 'Invalid email or password credentials', 401);
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return sendError(res, 'Invalid email or password credentials', 401);
      }

      const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      return sendSuccess(
        res,
        {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            company: user.company,
          },
        },
        'Login successful'
      );
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: any, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, 'Unauthorized', 401);
      }
      return sendSuccess(res, req.user, 'Profile retrieved');
    } catch (error) {
      next(error);
    }
  }
}

