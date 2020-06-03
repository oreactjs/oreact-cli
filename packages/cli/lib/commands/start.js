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

	let cmd = ``, args = [];
	switch (command) {
		case 'dev':
			cmd = `oreact tailwind build && ${resolve(cwd, 'node_modules/.bin/razzle')} start`;
			break;
		case 'prod':
			cmd = `NODE_ENV=production node -r ${require.resolve('dotenv/config')} ${resolve(cwd, 'build/server.js')} dotenv_config_path=.env.production`;
			break;
	}

	await spawn(cmd, [...args], { shell: true, cwd, stdio }).catch((error) => {
		console.error('Failed!');
		console.error('exit status:', error.exitStatus);
		console.log(error);
		//console.error('stderr:', error.stderr.toString())
	});

};
