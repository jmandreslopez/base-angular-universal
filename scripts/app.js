const fs = require('fs');
const _ = require('lodash');
const { program } = require('commander');
const moment = require('moment');

program
  .option('--file <path>', 'file path')
  .option('--type <type>', 'update type') // Type: 'serve', 'build', 'major', 'minor', 'patch'
  .parse(process.argv);

// Continue only if there's a file path defined
if (_.isUndefined(program.file) || _.isUndefined(program.type)) {
  return; // break
}

const file = program.file;
const type = program.type;

// Default values
const getDefault = () => {
  return {
    version: '0.0.0',
    timestamp: getTimestamp(),
  };
};

// Get MomentJS timestamp
const getTimestamp = () => moment().format('YYYY-MM-DDTHH:mm:ss');

// Stringify JSON
const stringify = (file) => JSON.stringify(file, null, 2); // Pretty JSON

// Increase Version
increaseVersion = (version) => {

  let splitVersion = version.split('.');
  let number;

  switch (type) {

    case 'major':
      number = parseInt(splitVersion[0], 10);
      number++; // Increase major version
      splitVersion[0] = number;
      break;

    case 'minor':
      number = parseInt(splitVersion[1], 10);
      number++;
      splitVersion[1] = number;
      break;

    case 'patch':
    default:
      number = parseInt(splitVersion[2], 10);
      number++; // Increase patch version
      splitVersion[2] = number;
      break;

  }

  return splitVersion.join('.');

};

// Read file with UTF8 enconding
// Return JSON parsed content
const read = (filename) => JSON.parse(fs.readFileSync(filename, 'utf8'));

// Write content into file
const write = (filename, content, output = false) => {

  fs.writeFile(filename, stringify(content), (err) => {

    if (err) {
      return console.log(err);
    }

    if (output) {
      console.log('========== Build version set to ' + content.version + ' ==========');
    }

  });

};

// =======================
// Serve Mode
// =======================

if (type === 'serve') {

  // Check if file exists, if not
  // create the first version
  fs.exists(file, (exists) => {

    if (exists) {
      return; // break
    }

    // Default values
    const content = getDefault();

    // Save File
    write(file, content);

  });

  return; // break
}

// =======================
// Build Mode
// =======================

// Check if file exists, if not
// create it and if exists increase
// the current version and timestamp
fs.exists(file, (exists) => {

  // Default values
  let content = getDefault();

  if (exists) {

    // Get current values
    content = read(file);

    // Update values
    content = {
      ...content,
      version: increaseVersion(content.version), // Increase Version
      timestamp: getTimestamp(), // Update Timestamp
    };

  }

  // Save File
  write(file, content, true);

});
