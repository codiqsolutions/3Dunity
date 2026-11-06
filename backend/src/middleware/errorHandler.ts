import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHelper';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('❌ Global Error:', err);

  if (err.name === 'ValidationError') {
    return sendError(res, 'Validation Error', 400, err.errors);
  }

  if (err.name === 'CastError') {
    return sendError(res, `Invalid resource identifier: ${err.value}`, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return sendError(res, `Duplicate field value entered: ${field}`, 409);
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return sendError(res, 'Uploaded file exceeds the maximum allowed file size limit.', 413);
  }

  const message = err.message || 'Internal Server Error';
  const status = err.statusCode || 500;
  return sendError(res, message, status);
};

