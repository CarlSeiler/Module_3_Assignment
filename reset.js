// setup.js
const mongoClient = require('mongodb').MongoClient;
// const Db = require('mongodb').Db;
const asyncmodule = require('async');
const assert = require('assert');

mongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
        assert.equal(null, err);
        var db1 = db.db('edx');
        // 
        // May be a better way to do this:
        //
        // This checks to see if
        // at least one of the collections exist before continuing.
        db1.listCollections({name: 'customers'})
          .next(function (err, collinfo) {
             if (collinfo) {
               console.log('Cleaning up...');
               db1.dropCollection("customers", function(err, result) {
                  assert.equal(null, err);
                  db1.close();
                });
              }
             else {
               console.log('Good to go. No cleanup needed apparently.');
               db1.close();
             }
          });

       
    });