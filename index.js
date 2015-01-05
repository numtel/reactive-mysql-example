var express = require('express');
var sockjs = require('sockjs');
var http = require('http');
var LiveSelect = require('mysql-live-select');

var dbSettings = require('./settings');

var sockOptions = {
  sockjs_url: "http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"
};

var db = new LiveSelect(dbSettings);
var app = express();
var server = http.createServer(app);

var results = db.select('select * from players order by score desc', [ {
  table: 'players'
} ]);

['added', 'changed', 'removed'].forEach(function(eventName){
  results.on(eventName, function(/* row, [newRow,] index */){
    var msg = JSON.stringify({
      type: eventName,
      data: arguments[arguments.length - 2],
      index: arguments[arguments.length - 1]
    });
    connected.forEach(function(conn){
      conn.write(msg);
    });
  });
});

var sock = sockjs.createServer(sockOptions);
var connected = [];
sock.on('connection', function(conn) {
  connected.push(conn);

  // Add helper method
  conn.writeJSON = function(msg){
    this.write(JSON.stringify(msg));
  }.bind(conn);

  // Provide initial result set snapshot
  conn.writeJSON({
    type: 'init',
    data: results.data
  });

  conn.on('data', function(message) {
    var data = JSON.parse(message);
    switch(data.type){
      case 'increment':
        var id = parseInt(data.id, 10);
        if(id > 0){
          db.db.query('UPDATE players SET score=score+5 WHERE id=' + id);
        }
        break;
    }
  });
});
sock.installHandlers(server, { prefix:'/sock' });

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static(__dirname + '/public'));

server.listen(5000);
