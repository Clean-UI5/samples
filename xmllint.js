const chalk = require('chalk');
const validation = require('@sap/di.code-validation.core/src/lib/validation');
const projectDir = './';
const projectRootPath = './';
const Config = require('@sap/di.code-validation.core/src/lib/validationConfig');

const xmlValidator = '@sap/di.code-validation.xml';
const defaultConfig = {
  validators: {
    [xmlValidator]: {
      extensions: ['.xml']
    }
  }
};

validation.executeForProject(projectDir, projectRootPath, new Config(defaultConfig), function (report) {
  const { issues } = report[xmlValidator];
  const counts = {};
  Object.keys(issues).forEach((fileName) => {
    console.log(chalk.underline(fileName));
    const messages = issues[fileName];
    messages.forEach(({ id, line, column, severity, message }) => {
      counts[severity] = (counts[severity] ?? 0) + 1;
      const output = [
        line.toString().padStart(4, ' '),
        ':',
        column.toString().padEnd(4, ' ')
      ];
      if (severity === 'error') {
        output.push(chalk.red(severity));
      } else {
        output.push(severity);
      }
      output.push(''.padStart(9 - severity.length, ' '));
      output.push(' ', message);
      if (id) {
        output.push(' (', id, ')');
      }
      console.log(output.join(''));
    });
    console.log();
  });
  if (counts.error) {
    console.log(chalk.red(`✖ ${counts.error} errors`));
    process.exit(-1);
  }
});
