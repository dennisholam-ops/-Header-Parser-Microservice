module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'GET') {
    // Get IP address from various headers
    let ipaddress = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress;
    
    // Clean IP address (remove IPv6 prefix and port if present)
    if (ipaddress) {
      if (ipaddress.includes('::ffff:')) {
        ipaddress = ipaddress.replace('::ffff:', '');
      }
      if (ipaddress.includes(',')) {
        ipaddress = ipaddress.split(',')[0].trim();
      }
      if (ipaddress.includes(':')) {
        ipaddress = ipaddress.split(':')[0];
      }
    }
    
    // Get language and software from headers
    const language = req.headers['accept-language'] || 'unknown';
    const software = req.headers['user-agent'] || 'unknown';
    
    // Return JSON response with exact keys required by FreeCodeCamp
    res.status(200).json({
      ipaddress: ipaddress || 'unknown',
      language: language,
      software: software
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
