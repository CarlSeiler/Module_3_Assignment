// migrate-data.js
const mongoClient = require('mongodb').MongoClient;
const async = require('async');

process.argv.forEach((val, index, array) => {
    console.log(`${index} : ${val}`);
});
let arg = Number(process.argv[2]);
    
if ((typeof (arg) === 'number' && (arg % 1) === 0 && arg > 0)) {
    // Parameter probably OK, so let's go with it.
} else {
    // Parameter probably not OK, so let's get out of here.

    console.log(`Parameter ${process.argv[2]} missing or is not positive integer. Exiting.`);

}

// let tasks = [ ( )];
// async.parallel (tasks, (error, results) => {
//   if (error) console.error(error);
//   console.log(results);
// });
