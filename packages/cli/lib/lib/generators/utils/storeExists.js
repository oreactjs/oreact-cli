/**
 * Check page Exists
 * @type {module:fs}
 */

const fs = require('fs');
const helpers = require('../../helpers');
const storeComponents = fs.readdirSync(
  helpers.cwdResolve('src/app/stores'),
);

const stores = storeComponents;

function themeExists(comp) {
  return stores.indexOf(comp) >= 0;
}

module.exports = themeExists;
