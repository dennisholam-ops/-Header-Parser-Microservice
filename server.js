const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// API endpoint - MUST be exactly /api/whoami
app.get('/api/whoami', (req, res) => {
  // Get IP address - handle various scenarios
  let ip = req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           req.connection.socket?.remoteAddress;

  // Clean IP address (remove IPv6 prefix if present)
  if (ip && ip.includes('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }
  
  // If IP is still undefined, set a default
  if (!ip) {
    ip = 'unknown';
  }

  // Get headers
  const language = req.headers['accept-language'] || 'unknown';
  const software = req.headers['user-agent'] || 'unknown';

  // Return JSON response with exact keys required
  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

// Root route - optional but helpful
app.get('/', (req, res) => {
  res.json({
    message: 'Request Header Parser Microservice',
    usage: 'Visit /api/whoami to see your request headers'
  });
});

// Start server
const listener = app.listen(PORT, () => {
  console.log('Server is running on port ' + listener.address().port);
});

module.exports = app;
