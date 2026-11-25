export function errorHandler(err, req, res, next) {
  const status = Number(err.statusCode) || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ success: false, message: status >= 500 ? 'An unexpected server error occurred.' : err.message });
}
