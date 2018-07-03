// migrate-data.js
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/edx';
const asyncmodule = require('async');

const cust_data = require('./m3-customer-data.json');
const cust_addresses = require('./m3-customer-address-data.json');

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

        cust_data.forEach((customer, index, list) => {
          cust_data[index] = Object.assign(customer, cust_addresses[index]);
          
          // As you go through the customers, if the index divides evenly into the 
          // the limit, then push that section onto the array of tasks
          if (index % limit == 0) {
            const start = index;
            // Start at current index and go through start+limit unless that goes beyond the end
            // of the array, in which case you end at the length of the array minus 1.
            const end = (start+limit > cust_data.length ? cust_data.length-1 : start+limit);
            tasks.push((done) =>{
              //console.log (`Inserting index ${start} through ${end-1}.`);
              customerCollection.insert(cust_data.slice (start, end), (error, results) =>{
                done(error, results);
              });
            });
          }
        });
        console.log (`Starting ${tasks.length} tasks in parallel.`);
        const timer1 =Date.now();
        asyncmodule.parallel (tasks, (err, results) => {
          if (err) { console.log(`Parallel task problem: ${err.message}`);
          db1.close();
          }
          else {
            const timer2 = Date.now();
            console.log (`Time elapsed:  ${timer2 - timer1}` );
            db1.close();
          }

        });
        
      }

    });
} else {
    // Parameter probably not OK, so let's get out of here and give instructions
    // to user.
    console.log(
        `Parameter ${process.argv[2]} missing or is not positive integer. Exiting.`);
    console.log(
          `Format is: node migrate-data.js <X>\n  Where <X> is number of entries per parallel job to migrate.`);
  }