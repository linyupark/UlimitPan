var 
express = require('express'),
baiduAPI = require('./lib'),
app = express();

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res){
  baiduAPI.init(function(cookie){
    baiduAPI.rest("http://pan.baidu.com/api/quota", function(body){
      return res.json(body);
    });
  })
});
app.get('/list', function(req, res){
  baiduAPI.rest("http://pan.baidu.com/api/list", function(body){
    return res.json(body);
  });
});

// 
// app.get('/', function(req, res){
//   baiduAPI.shared(248, "http://pan.baidu.com/api/quota", function(body){
//     return res.json(body);
//   });
// });

// app.get('/list', function(req, res){
//   baiduAPI.shared(463, "http://pan.baidu.com/api/list", function(body){
//     return res.json(body);
//   });
// });

app.listen(3000);