const { join } = require('path');
const { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } = require('fs');
const [,, name, groupName = 'Others'] = process.argv;
const cdmConfig = require('./cdm/config.json');

let targetGroupId;
let tileId = 0;
Object.keys(cdmConfig.groups).forEach((groupId) => {
  const group = cdmConfig.groups[groupId];
  const { id, title } = group.identification;
  if ([id, title].map(s => s.toLowerCase()).includes(groupName.toLowerCase())) {
    targetGroupId = groupId;
  }
  group.payload.tiles.forEach((tile) => {
    if (tile.vizId === name) {
      console.error('Tile already exists');
      process.exit(-1);
    }
    tileId = Math.max(parseInt(tile.id, 10) + 1, tileId);
  });
});
if (targetGroupId === undefined) {
  console.error('Group does not exist');
  process.exit(-1);
}

console.log('Group ID :', targetGroupId, '\nTile ID :', tileId);

cdmConfig.catalogs.SampleApps.payload.viz.push(name);
cdmConfig.visualizations[name] = {
  vizType: 'sap.ushell.StaticAppLauncher',
  businessApp: `samples.applications.${name}`,
  vizConfig: {
    'sap.flp': {
      target: {
        appId: `samples.applications.${name}`,
        inboundId: `sample-${name}`,
        parameters: {}
      }
    }
  }
};
cdmConfig.applications[`samples.applications.${name}`] = {
  'sap.app': {
    id: `samples.applications.${name}`,
    applicationVersion: {
      version: '1.0.0'
    },
    title: name,
    subTitle: '',
    crossNavigation: {
      inbounds: {
        [`sample-${name}`]: {
          semanticObject: 'sample',
          action: name,
          signature: {
            parameters: {},
            additionalParameters: 'allowed'
          }
        }
      }
    }
  },
  'sap.ui5': {
    models: {},
    componentName: `samples.applications.${name}`
  },
  'sap.flp': {
    businessApp: `samples.applications.${name}`,
    defaultLauncher: `sample-${name}`
  },
  'sap.ui': {
    technology: 'UI5',
    icons: {
      icon: 'sap-icon://project-definition-triangle'
    },
    deviceTypes: {
      desktop: true,
      tablet: true,
      phone: true
    }
  },
  'sap.platform.runtime': {
    componentProperties: {
      url: `applications/${name}`
    }
  }
};
cdmConfig.groups[targetGroupId].payload.tiles.push({
  id: tileId.toString().padStart(5, '0'),
  vizId: name
});

console.log('Updating cdm/config.json...');
writeFileSync(join(__dirname, 'cdm/config.json'), JSON.stringify(cdmConfig, undefined, 2));

console.log('Generating shortcut...');
writeFileSync(join(__dirname, `${name}.html`), `<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="refresh" content="0;url=index.html?${name}">
  </head>
</html>`);

console.log('Generating application...');
const replace = (source) => source.replace(/_template/g, name);
function instantiate (
  templatePath = join(__dirname, 'applications/_template'),
  appPath = join(__dirname, 'applications', name)
) {
  const content = readdirSync(templatePath);
  mkdirSync(appPath, { recursive: true });
  content.forEach(fileName => {
    const templateFileName = join(templatePath, fileName);
    const appFileName = join(appPath, fileName);
    const stat = statSync(templateFileName);
    if (stat.isDirectory()) {
      instantiate(templateFileName, appFileName);
    } else {
      const fileContent = readFileSync(templateFileName).toString();
      writeFileSync(appFileName, replace(fileContent));
    }
  });
}
instantiate();
