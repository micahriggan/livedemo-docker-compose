var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient();

let url = 'mongodb://mongo';
mongoClient.connect(url).then((db) => {
  db.createCollection('counter', (err, collection) => {
    collection.insertOne({
      name: 'default',
      count: 1
    });

    app.get('/count/:name?', (req, res) => {
      let query = {
        name: req.params.name || 'default'
      };

      collection.findOne(query, (err, val) => {
        if (!err) {
          res.send(val);
        } else {
          res.send(err);
        }
      });
    });

    app.get('/increment/:name?', (req, res) => {
      let query = {
        name: req.params.name || 'default'
      };

      let incrementRowQuery = (row) => {
        if (row == null)
          row = {
            count: 0
          };
        return {
          $set: {
            count: row.count + 1
          }
        };
      }

      collection.findOne(query, (err, val) => {
        if (val == null) {
          collection.insertOne({
            name: req.params.name || 'default',
            count: 1
          });
        }
        collection.updateOne(query, incrementRowQuery(val), (err, val) => {
          if (!err) {
            res.send(val);
          } else {
            res.send(err);
          }
        });

      });
    });
  });
}).catch((err) => {
  console.log(err);
});


app.get('/', (req, res) => {
  res.send('Hello world');
});


app.listen(3000, () => {
  console.log('Server listening on port: 3000');
});
