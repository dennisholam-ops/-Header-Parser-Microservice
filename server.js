const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// API endpoint
app.get('/api/whoami', (req, res) => {
  const ipaddress = req.ip || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null);
  
  // Clean up IP address (remove IPv6 prefix if present)
  const cleanIP = ipaddress.includes('::ffff:') 
    ? ipaddress.split(':').pop() 
    : ipaddress;
  
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  
  res.json({
    ipaddress: cleanIP,
    language: language || 'Not specified',
    software: software || 'Not specified'
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
