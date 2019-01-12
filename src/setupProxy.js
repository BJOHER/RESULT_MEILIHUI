const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/login', { 
  	target: 'http:10.2.153.15:9090', 
  	changeOrigin:true
  }));
app.use(proxy('/register', { 
  	target: 'http:10.2.153.15:9090', 
  	changeOrigin:true
  }));
app.use(proxy('/shopcart', { 
  	target: 'http:10.2.153.15:9090', 
  	changeOrigin:true
  }));
    
};