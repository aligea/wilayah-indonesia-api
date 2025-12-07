const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../../logs');
const errorLogFile = path.join(logsDir, 'error.log');

function sanitizeHeaders(headers) {
  if (!headers || typeof headers !== 'object') return headers;
  const copy = { ...headers };
  if (copy.authorization) delete copy.authorization;
  if (copy.cookie) delete copy.cookie;
  return copy;
}

async function logError(err, req) {
  try {
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const entry = {
      timestamp: new Date().toISOString(),
      message: err && (err.message || String(err)),
      stack: err && err.stack,
      method: req && req.method,
      path: req && (req.originalUrl || req.url),
      ip: req && (req.ip || (req.headers && req.headers['x-forwarded-for']) || (req.socket && req.socket.remoteAddress)),
      params: req && req.params,
      query: req && req.query,
      body: req && req.body,
      headers: sanitizeHeaders(req && req.headers)
    };

    const line = JSON.stringify(entry) + '\n';
    await fs.promises.appendFile(errorLogFile, line, 'utf8');
  } catch (writeErr) {
    // Do not throw from logger — fallback to console so original error handling continues
    console.error('Logger write failed:', writeErr);
  }
}

module.exports = { logError };
