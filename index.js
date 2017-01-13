'use strict';

var fs = require('fs');
var path = require('path');
var ruleFilenames = fs.readdirSync(path.resolve(__dirname, 'lib', 'rules')).map(function (f) {
    return f.replace(/\.js$/, '');
});

var rules = {};
var rulesConfig = {};

ruleFilenames.forEach(function (ruleFilename) {
    rules[ruleFilename] = require('./lib/rules/' + ruleFilename);
    rulesConfig[ruleFilename] = ['error'];
}),

module.exports = {
  rules: rules,
  configs: {
    recommended: {
      rules: rulesConfig,
    },
  },
};
