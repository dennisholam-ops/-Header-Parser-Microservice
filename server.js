const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/api/whoami", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const lang = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  
  res.json({
    ipaddress: ip,
    language: lang,
    software: software
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port ' + listener.address().port);
});
