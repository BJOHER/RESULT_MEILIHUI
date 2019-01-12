const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/login', { 
  	target: 'localhost:9090', 
  	changeOrigin:true
  }));
app.use(proxy('/register', { 
  	target: 'localhost:9090', 
  	changeOrigin:true
  }));
app.use(proxy('/shopcart', { 
  	target: 'localhost:9090', 
  	changeOrigin:true
  }));
    
};