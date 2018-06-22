// migrate-data.js
const mongoClient = require('mongodb').MongoClient;
// const Db = require('mongodb').Db;
const asyncmodule = require('async');
const assert = require('assert');
const util = require('util');


const importdata = require('./import.js');
const importStuff = util.promisify(importdata.importdata);
async function runImport() {

  return await importStuff();
}

const url = 'mongodb://localhost:27017';
const dbName = 'migrate';

let arg = Number(process.argv[2]);

if ((typeof (arg) === 'number' && (arg % 1) === 0 && arg > 0)) {
    // Parameter probably OK, so let's go with it.
    // Main code goes here.

    let c = [];
    mongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
        assert.equal(null, err);
        var db1 = db.db('edx');

        // var collection = db1.collection('cust_addresses');
        // May be a better way to do this:
        //
        // This checks to see if
        // at least one of the collections exist before continuing.
        db1.listCollections({name: 'cust_data'})
          .next(function (err, collinfo) {
             if (!collinfo) {
               console.log('Importing...');
                           runImport();
               }

             else {
               console.log('Good to go. No import needed, apparently.');
             }
          });
        // **************************************************************
        // ** At this point, we should have everything we need to do the
        // ** work.
        // **************************************************************
        //
        //  TODO: Eventually get this working.  right now,
        // Seems like the problem is this part kicks off before the
        // Database import completes.  Even if the database has been
        // imported before, it doesn't successfully add the recordID to the
        // collection during the foreEach loop.  :-|
        //
        // *************************************************************
        //
        // var addrCollection = db1.collection('cust_addresses');
        // var dataCollection = db1.collection('cust_data');
        // var i = 0;
        // addrCollection.find().forEach( (myDoc) => {
        //     addrCollection.update(myDoc, {$set: {recordID: i++ }});
        //     console.log('Updating: ' + 1);
        // }, (error) => {
        //   console.log ('Holy cow! An error was: ' + error);
        // });
        // dataCollection.find().forEach( (myDoc) => {
        //     dataCollection.update(myDoc, {$set: {"recordID": i++ }});
        // }, error => {
        //   console.log ('Holy cow! An error was: ' + error);
        // });
        db1.close();
    });

} else {
    // Parameter probably not OK, so let's get out of here.
    console.log(`Parameter ${process.argv[2]} missing or is not positive integer. Exiting.`);
}

// Check to see if data has already been imported to the MongoDB database,
// and if so, skip the import.


//
// console.log (db1.listCollections({name: 'cust_data'}).toArray(function(err, items) {
//   assert.equal(1, items.length);
// }));
