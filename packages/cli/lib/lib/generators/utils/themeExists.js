/**
 * Check page Exists
 * @type {module:fs}
 */

const fs = require('fs');
const helpers = require('../../helpers');
const themeComponents = fs.readdirSync(
  helpers.cwdResolve('src/app/themes'),
);

const themes = themeComponents;

function themeExists(comp) {
  return themes.indexOf(comp) >= 0;
}

module.exports = themeExists;
