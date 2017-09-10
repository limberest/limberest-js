'use strict';

const limberest = require('../lib/limberest');

// Note testsLoc on file system allows synchronous reads.
const testsLoc = '../../limberest-demo/test';
var group = limberest.loadGroupSync(testsLoc + '/movies-api.postman');

var test = group.getTest('GET', 'movies/{id}');

var values = Object.assign({}, limberest.loadValuesSync(testsLoc + '/global.values'));
values = Object.assign(values, limberest.loadValuesSync(testsLoc + '/limberest.io.env'));

var options = {
  location: testsLoc,
  expectedResultLocation: testsLoc + '/results/expected',
  resultLocation: testsLoc + '/results/actual',
  debug: true,
  responseHeaders: ['content-type']
};
    
test.run(options, values, (error, response) => {
  test.verify(values, (err, result) => {
    if (err)
      console.log(err);
  });
});