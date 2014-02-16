var mongoClient = require('mongodb').MongoClient,
    MUD         = require('./mudserver.js'),
    net         = require('net');

mongoClient.connect('mongodb://127.0.0.1:27017/muddb', function(err, db) {
  if (err) {
    throw err;
  } else {
    var server = net.createServer(function(c) {
      c.on('data', function(data) {
        var response = MUD.command(JSON.parse(data), db);
        c.write(response);
      });
      c.on('end', function() {

      });
    });

    server.listen('9123', 'localhost');
  }
});

