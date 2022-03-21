module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Warn on high fan-out",
      category: "Possible Errors",
    },
    fixable: "code",
    schema: [{
      type: "integer",
      minimum: 0
    }]
  },
  create: function (context) {
    'use strict';

    const max = context.options[0];
    let fanOut = 0;
    let reported = false;

    return {
      ExpressionStatement: function (node) {
        if (node.expression.type === 'CallExpression' &&
          node.expression.callee.type === 'MemberExpression' &&
          node.expression.callee.object.type === 'MemberExpression' &&
          node.expression.callee.object.object.name === 'sap' &&
          node.expression.callee.object.property.name === 'ui' &&
          ['define', 'require'].includes(node.expression.callee.property.name)) {
          const argumentsNode = node.expression.arguments[0];
          if (argumentsNode.type !== 'ArrayExpression') {
            return;
          }
          fanOut += argumentsNode.elements.length;
          if (fanOut > max && !reported) {
            context.report(node, 'High fan-out detected');
            reported = true;
          }
        }
      }
    };
  }
};
