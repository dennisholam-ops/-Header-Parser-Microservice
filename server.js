const express = require('express');
const app = express();

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

const listener = app.listen(3000, () => {
  console.log('Server started');
});
