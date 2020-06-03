const rimraf = require('rimraf');
const { resolve } = require('path');
const { promisify } = require('util');
const { isDir, error } = require('../util');
const spawn = require('cross-spawn-promise');

const toBool = val => val === void 0 || (val === 'false' ? false : val);
const stdio = 'inherit';

module.exports = async function(command, argv) {

	let cwd = resolve(argv.cwd);

	let orup = `${require.resolve('./../../node_modules/.bin/orup')}`;
	let cmd = `${orup} ${command}`, args = [];

	if(argv.config){
		args.push(`--config=${argv.config}`);
	}

	if(argv.servers){
		args.push(`--servers=${argv.servers}`);
	}

	if(argv['show-hook-names']){
		args.push(`--show-hook-names=${argv['show-hook-names']}`);
	}

	if(argv['version']){
		args.push(`--version`);
	}

	if(argv['verbose']){
		args.push(`--verbose`);
	}

	await spawn(cmd, [...args], { shell: true, cwd, stdio }).catch((error) => {});
};
