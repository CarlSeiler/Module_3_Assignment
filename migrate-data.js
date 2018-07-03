// migrate-data.js
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/edx';
// const Db = require('mongodb').Db;
const asyncmodule = require('async');
//const util = require('util');

const cust_data = require('./m3-customer-data.json');
const cust_addresses = require('./m3-customer-address-data.json');

//const importdata = require('./import.js');
//const importStuff = util.promisify(importdata.importdata);
// async function runImport() {
//  return await importStuff();
// }

const dbName = 'migrate';

let arg = Number(process.argv[2]);

if ((typeof(arg) === 'number' && (arg % 1) === 0 && arg > 0)) {
    // Parameter probably OK, so let's go with it.
    // Main code goes here.
    let tasks = [];
    const limit = parseInt(arg); // Make sure one last time it is integer
    mongoClient.connect(url, (err, db) =>{
      if (err) {
        console.log (`Connection problem: ${err.message}`);
      }
      else {
        var db1 = db.db('edx');
        var customerCollection = db1.collection('customers');

        cust_data.array.forEach((customer, index, list) => {
          cust_data[index] = Object.assign(customer, cust_addresses[index]);
          
          // As you go through the customers, if the index divides evenly into the 
          // the limit, then push that section onto the array of tasks
          if (index % limit == 0) {
            const start = index;
            // Start at current index and go through start+limit unless that goes beyond the end
            // of the array, in which case you end at the length of the array minus 1.
            const end = (start+limit > cust_data.length ? cust_data.length-1 : start+limit);
            tasks.push((done) =>{
              console.log (`Inserting ${start} through ${limit}.`);
              customerCollection.insert(cust_data.slice (start, end), (error, results) =>{
                done(error, results);
              });
            });
          }
        });
        console.log (`Starting ${tasks.length} tasks in paralle.`);
        asyncmodule.parallel (tasks, (err, results) => {
          if (err) { console.log(`Parallel task problem: ${err.message}`);
          db1.close();
          }
          else {

            db1.close();
          }

        });
        
      }

    });
} else {
    // Parameter probably not OK, so let's get out of here.
    console.log(
        `Parameter ${process.argv[2]} missing or is not positive integer. Exiting.`
    );
}

// Check to see if data has already been imported to the MongoDB database,
// and if so, skip the import.


//
// console.log (db1.listCollections({name: 'cust_data'}).toArray(function(err, items) {
//   assert.equal(1, items.length);
// }));