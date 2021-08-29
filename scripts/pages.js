const fs = require('fs');
const ncp = require('ncp').ncp;

// Configs
const angular = 'angular.json';
const pages = 'pages';

// Check for source path
if (! fs.existsSync(pages)) {
  throw new Error('No pages path found.');
}

console.log(`Source: ${pages}`);

// Check if angular.json file exists
fs.exists(angular, (exists) => {
  if (! exists) {
    throw new Error('No file found: angular.json');
  }
});

// Get output path from angular.json
const json = JSON.parse(fs.readFileSync(angular, 'utf8'));
const project = Object.keys(json.projects)[0];
const output = json.projects[project].architect.build.options.outputPath;

if (! fs.existsSync(output)) {
  throw new Error('No output path found. Build app and try again.');
}

console.log(`Output: ${output}`);

// Copy files
ncp(pages, output, (error) => {
  if (error && error !== null) {
    throw new Error(error);
  }
  console.log('Pages copied successfully!');
});
