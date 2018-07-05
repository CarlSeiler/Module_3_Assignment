# Migrate Data
## A project for [Indroduction to NodeJS](https://courses.edx.org/courses/course-v1:Microsoft+DEV283x+1T2018/courseware/1e95019f-b0fe-1ae9-fcf4-4e35d66aa371/50a265d9-ebaa-af4a-2ced-b569e840bb28/?child=first "Microsoft: DEV283x - Introduction to NodeJS") Course at edX

### Module 3, Assignment Lab

Additional requirements:

1. nodeJS
2. npm
3. mongodb, usually installed globally
4. Must have [m3-customer-data.json](https://prod-edxapp.edx-cdn.org/assets/courseware/v1/49802b4bc23bb76c0a1eb9bff4178d55/asset-v1:Microsoft+DEV283x+1T2018+type@asset+block/m3-customer-data.json) and [m3-customer-address-data.json](https://prod-edxapp.edx-cdn.org/assets/courseware/v1/e70f5903852879899f031ced3ddf0a92/asset-v1:Microsoft+DEV283x+1T2018+type@asset+block/m3-customer-address-data.json) retrieved saved in directory.  


How to install:

1. clone package
2. run _npm install_ in the resulting directory.

How to run:

1. Start mongodb:  _mongod_
2. run _node migrate-data.js X_ where X is number of records to process in each parallel assignment
2. or use _./go.sh X_

#### Observations, design, and description

1. This was a mess from the beginning.  Instructions say "Luckily, your friends were able to restore the address 
information from a backup replica of a MongoDB instance" which seems to imply that the information is 
already in a MongoDB database.  The walk-through indicates that is not the case.

2. The instructions say "You have millions of records so you need to create
a script which can run queries to the database in parallel."  This would indicate that the final 
script should be able to handle millions of records.  One problem with that would be that 
you may not be able load an array or set of arrays into memory if it consists of millions of 
records.  Ideally, you would read the records from the json file (or the database), and process
them a portion at a time in some sort of parallel or sequential fashion.  The walk-through, however,
loads two arrays into memory.

3.  The instructions "Read the number of objects to process in a single query from a CLI argument.
 For example, node migrate-data.js 1000 will run 10 queries in parallel out of 1000 objects while
 node migrate-data.js 50 will run 20 queries in parallel out of the same 1000 objects" is simply _wrong_.  
 1000 divided by 1000 is not 10.

4. So the solution is simply to read two json files into memory as arrays of objects.
Then you cycle through each object merging using [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign "Object Assign Method at Mozilla.org").

For each record as you merge the arrays into one, check to see if it is a whole chunk using the _mod_ operator (%),
and if so, push it onto the array of tasks.

After the array of tasks is built, you've gone through the whole of the two customer data arrays, and assembled a new array.
Theoretically, that could have been done in parallel, but again in the walk-through, it is not.  Now, go
through the tasks in parallel, each task ads one slice into the Mongo database.

5.  If you need to reset to experiment with it, use _node reset.js_ which will drop the collection from the MongoDB database.