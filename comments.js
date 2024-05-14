// Create web server
// Web server will listen at port 3000
// Web server will respond to requests with the comments page

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var path = require('path');

// Configure our HTTP server to respond with a comments page
var server = http.createServer(function (request, response) {
  console.log('Request: ' + request.url);
  if (request.url == '/') {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(fs.readFileSync('comments.html'));
    response.end();
  } else {
    var filePath = '.' + request.url;
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
      case '.css':
        contentType = 'text/css';
        break;
      case '.js':
        contentType = 'text/javascript';
        break;
    }
    fs.readFile(filePath, function(error, content) {
      if (error) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
      } else {
        response.writeHead(200, {"Content-Type": contentType});
        response.write(content);
        response.end();
      }
    });
  }
});

// Listen on port 3000, IP defaults to