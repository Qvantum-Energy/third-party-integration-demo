const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.all('*', (req, res) => {
  proxy.web(req, res, {
    target: 'https://api.qvantum.com',
    changeOrigin: true,
    secure: false
  });
});

proxy.on('error', function(err, req, res) {
    console.error('Proxy error:', err);
    res.writeHead(500, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': 'http://localhost:5173', // Set CORS headers even on error
      // ...
    });
    res.end('Proxy error: ' + err.message);
  });
  
console.log("Proxy server listening on port 5172");
app.listen(5172);



// const http = require('http');
// const httpProxy = require('http-proxy');

// const proxy = httpProxy.createProxyServer({});

// proxy.on('proxyRes', (proxyRes, req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
// });

// const server = http.createServer((req, res) => {
//   const options = {
//     target: 'https://api.qvantum.com', // Target host to proxy to
//     changeOrigin: true, // Changes the origin of the host header to the target URL
//     secure: false // Depends on your needs, set to true if you're dealing with self-signed certificates
//   };

//   if (req.method === 'OPTIONS') {
//     res.writeHead(200, {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
//       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//       'Access-Control-Allow-Credentials': 'true',
//     });
//     res.end();
//     return;
//   }

//   // Proxy the request
//   proxy.web(req, res, options);
// });

// console.log("Proxy server listening on port 5172");
// server.listen(5172);
