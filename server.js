const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from public directory
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint
app.get('/api/whoami', (req, res) => {
  // Get IP address from request
  const ipaddress = req.ip || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress ||
                    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  
  // Clean up IP address (remove IPv6 prefix if present)
  const cleanIp = ipaddress.replace(/^::ffff:/, '');
  
  // Get preferred language from Accept-Language header
  const language = req.headers['accept-language'];
  
  // Get software from User-Agent header
  const software = req.headers['user-agent'];
  
  // Return JSON response
  res.json({
    ipaddress: cleanIp,
    language: language || 'Not specified',
    software: software || 'Not specified'
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
