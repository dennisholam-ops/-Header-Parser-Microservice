const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  const response = {
    ipaddress: req.ip || req.connection.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  };
  
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
