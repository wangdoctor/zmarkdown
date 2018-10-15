var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
const marked = require('marked');
 
app.use(express.static('public'));
 
app.get('/index', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/pic/*', function (req, res) {
  res.sendFile( __dirname + "/" + req.url );
  console.log("Request for " + req.url + " received.");
})
  app.get('/md', function(req, res) {
    res.type('json');
    let ret = {};
    console.log(req.query);
    if (!req.query.id) {
      req.query.id="store.md";
    }
    
    fs.readFile(__dirname+"\/"+req.query.id, "utf8", (err,data) => {
      if(err) {console.log(err);return;}
        Object.assign(ret, {
            data: {
              "name": data
            }
        });
        res.send(ret);
    })
  });

  var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://localhost:%s", port)
 
})