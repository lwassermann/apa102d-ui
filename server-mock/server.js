const http = require('http');
const querystring = require('querystring');

const port = 8090;

function startServer() {
  const server = http.createServer((req, res) => {
    if (req.url === '/api/effects') {
      handOffToApa102(req, res);
    } else {
      res.writeHead(404, 'Not Found');
      res.end();
    }
  });

  server.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
}

function handOffToApa102(req, res) {
  if (req.method === 'POST') {
    let fullBody = '';

    req.on('data', (chunk) => { fullBody += chunk.toString(); });

    req.on('end', function() {
      const decodedBody = querystring.parse(fullBody);
      const apaArguments = Object.keys(decodedBody).map(key => `${key}=${decodedBody[key]}`);

      res.writeHead(200, 'OK');
      res.end(apaArguments.join(' '));
    });

    req.on('error', error => respondError(res, error));
  } else {
    res.writeHead(405, 'Method not supported');
    res.end();
  }
}

function respondError(res, error, additionalText) {
  console.error('[500]', error, additionalText);
  res.writeHead(500, 'Internal Server Error');
  res.end();
}

startServer();
