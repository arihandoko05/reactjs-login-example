const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("Setup proxy is ever called");
    app.use(proxy('/api', {
        target: 'http://wdassignment.devfl.com',
        changeOrigin:true
    }));
};