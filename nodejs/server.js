/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
*/



var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    if (query.text) {
        console.log(query.text);

        fs.writeFile("log.txt", query.text, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    }
    var filename = '';
    if (uri == '/') {
        filename = path.join(process.cwd(), uri + 'client.html');
    } else {
        filename = path.join(process.cwd(), uri);
    }
    fs.exists(filename, function(exists) {
        if (!exists) {
            console.log("not exists: " + filename);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.write('404 Not Found\n');
            res.end();
            return;
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, {
            'Content-Type': mimeType
        });

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);

    }); //end path.exists
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
