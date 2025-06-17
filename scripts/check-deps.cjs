const fs = require('fs');
const path = require('path');

const nodeModules = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(nodeModules)) {
  console.error('Dependencies missing. Run "npm install" first.');
  process.exit(1);
}
