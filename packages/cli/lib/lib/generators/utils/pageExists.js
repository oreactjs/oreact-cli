/**
 * Check page Exists
 * @type {module:fs}
 */

const fs = require('fs');
const helpers = require('../../helpers');
const pageComponents = fs.readdirSync(
  helpers.cwdResolve('src/app/pages'),
);

const pages = pageComponents;

function pageExists(comp) {
  return pages.indexOf(comp) >= 0;
}



module.exports = pageExists;
