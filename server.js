const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// API endpoint - this is the key part that must match FreeCodeCamp requirements
app.get('/api/whoami', (req, res) => {
  // Get IP address - FreeCodeCamp expects the first one from x-forwarded-for or the direct connection
  const ipaddress = req.headers['x-forwarded-for'] 
    ? req.headers['x-forwarded-for'].split(',')[0] 
    : req.socket.remoteAddress;

  // Get language - first entry from accept-language header
  const language = req.headers['accept-language'];
  
  // Get software - from user-agent header
  const software = req.headers['user-agent'];

  // Return the exact JSON structure expected by FreeCodeCamp
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
