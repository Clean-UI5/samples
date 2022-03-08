const fs = require('fs');
const validation = require('@sap/di.code-validation.core/src/lib/validation');

const projectDir = './';
const projectRootPath = './';
const Config = require('@sap/di.code-validation.core/src/lib/validationConfig');
const defaultConfig = {
  validators: {
    // '@sap/di.code-validation.js': {
    //   extensions: ['.js', '.xsjs']
    // },
    '@sap/di.code-validation.xml': {
      extensions: [ '.xml']
    }
  }
}

validation.executeForProject(projectDir, projectRootPath, new Config(defaultConfig), function (issues) {
    var stringified = JSON.stringify(issues);
    process.stdout.write(stringified);
    fs.writeFileSync('di-code.validation.json', stringified);
    process.exit(0);
});