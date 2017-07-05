'use strict';

const fs = require('fs');
const path = require('path');
const postman = require('./postman');
const group = require('./group');

function Limberest(options) {
}

Limberest.prototype.env = function(file) {
  const obj = JSON.parse(fs.readFileSync(file, 'utf8'))
  return postman.isEnv(obj) ? postman.env(obj) : obj;
};

Limberest.prototype.group = function(file) {
  const obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (postman.isGroup(obj)) {
    return group.create(file, postman.group(obj));
  }
  else {
    const g = group.create(file, obj);
    g.name = path.basename(file, path.extname(file));
    return g;
  }
};

module.exports = new Limberest();