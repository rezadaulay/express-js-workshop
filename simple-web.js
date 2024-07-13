const http = require('http');
const portNumber = 5000;

const server = http.createServer((req, res) => {
	// gunakan kondisi if-else untuk membuat halaman-halaman web

	// jika url yang diakses adalah /
    if(req.url === '/') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('This is my Home Page');
    }
	// jika url yang diakses adalah /about
	else if(req.url === '/about') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('This is my About Page');
	}
	// jika url yang diakses adalah /contact
    else if(req.url === '/contact') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('This is my Contact Page');
    }
	// selain halaman home, about dan contact maka kirim response 404 not found
	else {
        res.writeHead(404, {'content-type': 'text/html'});
        res.write('404, Resource Not Found');
    }
    res.end();
})

server.listen(portNumber, () => {
	console.log('Server listening at port ' + portNumber);
})