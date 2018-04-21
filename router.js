const file = require('./file');

module.exports = function router(req, res) {
    if (req.url === '/') {
		req.url = "index.html";
    }
    file(req, res);
}