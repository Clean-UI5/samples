module.exports = function (context) {
  'use strict';

  return {
    Program: function (node) {
      if (node.body.length > 1) {
        // Detects at least one `sap.ui.module` or `sap.ui.require`
        const isSAPUI5Module = node.body.some((child) => {
          return child.type === 'ExpressionStatement' &&
            child.expression.type === 'CallExpression' &&
            child.expression.callee.type === 'MemberExpression' &&
            child.expression.callee.object.type === 'MemberExpression' &&
            child.expression.callee.object.object.name === 'sap' &&
            child.expression.callee.object.property.name === 'ui' &&
            ['define', 'require'].includes(child.expression.callee.property.name);
        });
        if (isSAPUI5Module) {
          context.report(node, 'A SAPUI5 module should not have code outside of sap.ui.define / sap.ui.require');
        }
      }
    }
  };
};
