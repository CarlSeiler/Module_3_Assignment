// readMyFile.js

const fs = require('fs');
const util = require('util');
const path = require('path');

myFile = 'm8';

const ReadJSONStream = require('read-json-stream').default;
let i = 0;

ReadJSONStream(myFile)
.progress(p => {   console.log(`${p} percent so far!`); })
.done((err, data) => {
    if (err) {
      throw new Error ('Oops, I cannot read this file.');
    } else {
      console.log ('Chunk: ' + i);
      console.log (i);
      i++;
    }
  }
);
