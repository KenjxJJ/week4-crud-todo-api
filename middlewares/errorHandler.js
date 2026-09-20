const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log for you
  const status = err.status || 500;
  res.status(status).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }) // Dev only
  });
};

module.exports = errorHandler;