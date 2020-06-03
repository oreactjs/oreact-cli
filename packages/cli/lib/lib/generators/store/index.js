/**
 * Page Generator
 */

/* eslint strict: ["off"] */

'use strict';

const storeExists = require('../utils/storeExists');
const helpers = require('../../helpers');
const plopConfigs = require('../plopConfigs');

const themeGenerator = {
  description: 'Add an unconnected store',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'default',
      validate: value => {
        if (/.+/.test(value)) {
          return storeExists(value)
            ? 'A store with this name already exists'
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
        path: helpers.cwdResolve('src/app/stores/{{properCase name}}.js'),
        templateFile: require.resolve('../page/templates/store.js.hbs'),
        abortOnFail: true,
      }
    ];

    actions.push({
      type: 'prettify',
      path: '/stores/',
    });

    return actions;
  },
};

module.exports = plop => {
  plop.setGenerator('store', themeGenerator);
  plopConfigs(plop);
};
