var mongoClient = new require('mongodb').MongoClient,
    net         = require('net'),
    MUD         = require('./mudserver.js');


mongoClient.connect('mongodb://127.0.0.1:27017/muddb', function(err, db) {
  if (err) {
    throw err;
  } else {
    // check if collections are nonexistant
    ['players', 'world'].forEach(function(collectionName, i) {
      db.createCollection(collectionName);
    });

    // create the server
    var server = net.createServer(function(c) {
      c.on('data', function(data) {
        // parse JSON from the data
        MUD.command(JSON.parse(data), db);
        c.write(response);
      });

      c.on('end', function() {

      });
    });

    console.log(server);

    // listen on port 9123
    server.listen('9123', 'localhost');
  }
});
