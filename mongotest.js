const mongoClient = require('mongodb').MongoClient;
const updateDoc = require('./mycrud.js').updateDocument;
const assert = require ('assert');

mongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
        assert.equal(null, err);
        console.log ('Connection made');
        var db1 = db.db('edx');
        const newName = "The Walrus";
        updateDoc(db1, 'cust_data', { id : '1'}, { nick_name : newName}, function (err, result){
            if (err) {console.log (err.message);}
            db1.close();
        });
});