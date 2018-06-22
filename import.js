const exec = require('child_process').exec;
const asyncmodule = require('async');


var inputaddresses = (callback) => {
    exec('mongoimport --jsonArray --db edx --collection cust_addresses < m3-customer-address-data.json',
        (error) => {
            if (error) {
                console.log(`Error occurred: ${error.toString()}`);
                return;
            }
            callback(null, "OK2");
        });
};

var inputdata = (callback) => {
    exec('mongoimport --jsonArray --db edx --collection cust_data < m3-customer-data.json',
        (error) => {
            if (error) {
                console.log(`Error occurred: ${error.toString()}`);
            }
            callback(null, "OK1");
        });
};

module.exports = { importdata() {
  asyncmodule.parallel([
    inputaddresses, inputdata], (error, results) => {
    if (error) console.error(error);
    console.log(results);
});
}
};
