// readMyFile.js

const fs = require('fs');
const util = require('util');
const path = require('path');

filePath = 'm8';

const ReadJSONStream = require('read-json-stream').default;


ReadJSONStream(filePath)
  .progress(p => {
    console.log(`${p}% done so far!`);
  })
  .done((err, data) => {
    if(err) {
      // handle error
    } else {
      // do something with the freshly-parsed data!
      
    }
  });
