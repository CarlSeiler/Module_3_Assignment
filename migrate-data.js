// migrate-data.js
const mongoClient = require('mongodb').MongoClient;
const async = require('async');

process.argv.forEach((val, index, array) => {
    console.log(`${index} : ${val}`);
});
let arg = process.argv[2]; // giving this global scope so I can use it later.
try {
    arg = Number(process.argv[2]);
    console.log(arg);
} catch (error) {
    console.error(error);
    throw new Error('Command line parameter probably not an integer.');
}

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
