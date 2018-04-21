const fs = require('fs');
const path = require('path');

module.exports = function file(req, res) {
    let index = req.url.lastIndexOf('.');
	let contentType = req.url.substr(index + 1);
	switch (contentType) {
		case '/':
			contentType = 'text/html';
			break;
		case 'js':
			contentType = 'text/javascript';
			break;
		case 'css':
			contentType = 'text/css';
			break;
		case 'ico':
			contentType = 'image/x-icon';
			break;
		default:
			contentType = '';
			break;
    }
    let filePath = path.join(__dirname, '/static', req.url);
	res.writeHead(200, {
		'Content-type': contentType
	});
	let readStream = fs.createReadStream(filePath);
	console.dir(readStream);
	readStream.pipe(res);
}