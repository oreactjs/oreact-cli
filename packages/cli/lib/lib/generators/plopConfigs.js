/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const helpers = require('../helpers');
const spawn = require('react-dev-utils/crossSpawn');

/**
 * Every generated backup file gets this extension
 * @type {string}
 */
const BACKUPFILE_EXTENSION = 'rbgen';

module.exports = plop => {

  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(
        helpers.cwdResolve(`src/app/pages/${comp}`),
        fs.F_OK,
      );
      return `pages/${comp}`;
    } catch (e) {
      return `pages/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));

  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(helpers.cwdResolve('src/app/'),
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**',
      '**.js',
    )}`;

    try {
      result = spawn.sync(
        `npm run ${require.resolve('../../../node_modules/prettify')} -- "${folderPath}"`,
        { stdio: 'inherit' }
      );
      return folderPath;
    } catch (err) {
      throw err;
    }
  });

  /*
  plop.setActionType('backup', (answers, config) => {
    try {
      fs.copyFileSync(
        path.join(__dirname, config.path, config.file),
        path.join(
          __dirname,
          config.path,
          `${config.file}.${BACKUPFILE_EXTENSION}`,
        ),
        'utf8',
      );
      return path.join(
        __dirname,
        config.path,
        `${config.file}.${BACKUPFILE_EXTENSION}`,
      );
    } catch (err) {
      throw err;
    }
  });*/

};

module.exports.BACKUPFILE_EXTENSION = BACKUPFILE_EXTENSION;
