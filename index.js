var express = require('express');
var sockjs = require('sockjs');
var http = require('http');
var LiveSelect = require('mysql-live-select');

var dbSettings = require('./settings');
var sockOptions = {
  sockjs_url: "http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"
};

// Initialize components
var db = new LiveSelect(dbSettings);
var app = express();
var server = http.createServer(app);
var sock = sockjs.createServer(sockOptions);

// Cache socket connections
var connected = [];

// Initialze result set
var results = db.select('select * from players order by score desc', [ {
  table: 'players'
} ]);

// Result set event handlers
['added', 'changed', 'removed'].forEach(function(eventName){
  // `newRow` argument only provided on `changed` event
  results.on(eventName, function(/* row, [newRow,] index */){
    var msg = JSON.stringify({
      type: eventName,
      // Row data is always the second from last argument
      data: arguments[arguments.length - 2],
      // Index is always the last argument
      index: arguments[arguments.length - 1]
    });
    // Send change to all clients
    connected.forEach(function(conn){
      conn.write(msg);
    });
  });
});

// Socket event handler
sock.on('connection', function(conn) {
  connected.push(conn);

  // Provide initial result set snapshot
  conn.write(JSON.stringify({
    type: 'init',
    data: results.data
  }));

  // Handle incoming message from client
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

  conn.on('close', function() {
    // On close, remove connection from connection list
    var index = connected.indexOf(conn);
    connected.splice(index, 1);
  });
});

// Express configuration
sock.installHandlers(server, { prefix:'/sock' });

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static(__dirname + '/public'));

server.listen(5000);

