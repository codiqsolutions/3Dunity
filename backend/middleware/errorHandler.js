// backend/middleware/errorHandler.js
// 404 handler
function notFound(req, res, next) {
  const error = new Error(`Not Found – ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// General error handler
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // Show stack trace only in development
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

module.exports = { notFound, errorHandler };

