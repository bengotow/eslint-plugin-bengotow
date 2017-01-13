/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict';

var _ = require('lodash');
var lodashUtil = require('../util/lodashUtil');
var astUtil = require('../util/astUtil');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var REPORT_MESSAGE = 'Prefer \'_.{{method}}\' over the native function.';

    function isStaticNativeMethodCall(node) {
        var staticMethods = {
            Object: ['assign', 'create', 'keys', 'values'],
            Array: ['isArray']
        };
        var callerName = _.get(node, 'callee.object.name');
        return (callerName in staticMethods) && _.includes(staticMethods[callerName], astUtil.getMethodName(node));
    }

    return {
        CallExpression: function (node) {
            if (!(lodashUtil.isLodashCall(node) || lodashUtil.isLodashWrapper(astUtil.getCaller(node))) && (lodashUtil.isNativeCollectionMethodCall(node) || isStaticNativeMethodCall(node))) {
                context.report(node, REPORT_MESSAGE, {method: astUtil.getMethodName(node)});
            }
        }
    };
};