/**
 * Page Generator
 */

/* eslint strict: ["off"] */

'use strict';

const themeExists = require('../utils/themeExists');
const helpers = require('../../helpers');
const plopConfigs = require('../plopConfigs');

const themeGenerator = {
  description: 'Add an unconnected theme',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'default',
      validate: value => {
        if (/.+/.test(value)) {
          return themeExists(value)
            ? 'A theme with this name already exists'
            : true;
        }
        return 'The name is required';
      },
    }
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: helpers.cwdResolve('src/app/themes/{{properCase name}}.js'),
        templateFile: require.resolve('./templates/theme.js.hbs'),
        abortOnFail: true,
      }
    ];

    actions.push({
      type: 'prettify',
      path: '/themes/',
    });

    return actions;
  },
};

module.exports = plop => {
  plop.setGenerator('theme', themeGenerator);
  plopConfigs(plop);
};
