/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
  var REPORT_MESSAGE = 'Prefer native \'{{method}}\' over the underscore function.';
  var AVAILABLE_NATIVE = ['every', 'filter', 'find', 'findIndex', 'each', 'includes', 'map', 'reduce', 'reduceRight', 'some', 'reverse'];

  function isCallFromObject(node, objName) {
    return node && node.type === 'CallExpression' && node.callee.object && node.callee.object.name === objName;
  }

  function isStaticNativeMethodCall(node) {
    var staticMethods = {
      Object: ['assign', 'create', 'keys', 'values'],
      Array: ['isArray']
    };
    var callerName = node.callee.object.name;
    return staticMethods[callerName] && staticMethods[callerName].includes(node.callee.property.name);
  }

  return {
    CallExpression: function (node) {
      if (isCallFromObject(node, '_')) {
        if (node.callee.property && (AVAILABLE_NATIVE.indexOf(node.callee.property.name) !== -1)) {
          console.log(JSON.stringify(node.arguments));
          context.report(node, REPORT_MESSAGE, {method: node.callee.property.name});
        }
      }
    }
  };
};
