/**
 * Layout Generator
 */

/* eslint strict: ["off"] */

'use strict';

const pageExists = require('../utils/pageExists');
const helpers = require('../../helpers');

module.exports = {
  description: 'Add an unconnected layout',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Home',
      validate: value => {
        if (/.+/.test(value)) {
          return pageExists(value)
            ? 'A page with this name already exists'
            : true;
        }
        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'layoutName',
      message: 'Which layout would you like to use?',
      default: 'default'
    },
    {
      type: 'confirm',
      name: 'wantStore',
      default: false,
      message: 'Do you want to create a store?',
    }
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: helpers.cwdResolve('src/app/pages/{{properCase name}}/container.js'),
        templateFile: require.resolve('./templates/container.js.hbs'),
        abortOnFail: true,
      },
      {
        type: 'add',
        path: helpers.cwdResolve('src/app/pages/{{properCase name}}/config.js'),
        templateFile: require.resolve('./templates/config.js.hbs'),
        abortOnFail: true,
      }
    ];

    // If the user wants to create a store
    if (data.wantStore) {
      actions.push({
        type: 'add',
        path: helpers.cwdResolve('src/app/pages/{{properCase name}}/store.js'),
        templateFile: require.resolve('./templates/store.js.hbs'),
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/pages/',
    });

    return actions;
  },
};
