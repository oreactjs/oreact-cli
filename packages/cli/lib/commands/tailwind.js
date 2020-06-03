const rimraf = require('rimraf');
const { resolve } = require('path');
const { promisify } = require('util');
const { isDir, error } = require('../util');
const spawn = require('cross-spawn-promise');

const toBool = val => val === void 0 || (val === 'false' ? false : val);
const stdio = 'inherit';

module.exports = async function(command, argv) {

	let cwd = resolve(argv.cwd);
	let modules = resolve(cwd, 'node_modules');

	if (!isDir(modules)) {
		return error(
			'No `node_modules` found! Please run `npm install` before continuing.',
			1
		);
	}

	let cmd = `${require.resolve('./../../node_modules/.bin/tailwind')}`;

	let args = [];
	switch (command) {
		case 'build':
			args = [`build ${resolve(cwd, 'tailwind.base.css')} -c ${resolve(cwd, 'tailwind.js')} -o ${resolve(cwd, 'src/app/styles/tailwind.css')}`];
			break;
		case 'purge':
			cmd = 'node'
			args = [`${require.resolve('../lib/tailwind.purge.js')}`];
			break;
	}
	await spawn(cmd, [...args], { shell: true, cwd, stdio });

};
