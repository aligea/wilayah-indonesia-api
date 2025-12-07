const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.logError(err, req);
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
};
