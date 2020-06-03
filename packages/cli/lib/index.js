#!/usr/bin/env node
const envinfo = require('envinfo');
const sade = require('sade');
const notifier = require('update-notifier');
const { error } = require('./util');
const pkg = require('../package');

const ver = process.version;
const min = pkg.engines.node;
if (
	ver
		.substring(1)
		.localeCompare(min.match(/\d+/g).join('.'), 'en', { numeric: true }) === -1
) {
	return error(
		`You are using Node ${ver} but oreact-cli requires Node ${min}. Please upgrade Node to continue!`,
		1
	);
}

// Safe to load async-based funcs
const commands = require('./commands');

// installHooks();
notifier({ pkg }).notify();

process.on('unhandledRejection', err => {
	error(err.stack || err.message);
});

let prog = sade('oreact').version(pkg.version);


prog
	.command('init [template] [dest]')
	.describe('Create a new application')
	.option('--name', 'The application name')
	.option('--cwd', 'A directory to use instead of $PWD', '.')
	.option('--force', 'Force destination output; will override!', false)
	.option('--install', 'Install dependencies', true)
	.option('--npm', 'Use `npm` instead of `yarn`', false)
	.option('--git', 'Initialize git repository', false)
	.option('--license', 'License type', 'MIT')
	.option('-v, --verbose', 'Verbose output', false)
	.action(commands.init);

prog
	.command('start <command>')
	.describe('Start a live-reload server for development and production run`')
	.option('--cwd', 'A directory to use instead of $PWD', '.')
	.option('-v, --verbose', 'Verbose output')
	.action(commands.start);

prog
	.command('build', 'Create a production build')
	.describe('Create a production build')
	.option('--cwd', 'A directory to use instead of $PWD', '.')
	.option('-v, --verbose', 'Verbose output')
	.action(commands.build);

prog
	.command('orup <command>', 'Deploy Oreact apps')
	.describe('Deploy Oreact apps')
	.option('--cwd', 'A directory to use instead of $PWD', '.')
	.option('--version', 'Displays current version')
	.option('--config', 'Path to orup.js config file')
	.option('--servers', 'Comma separated list of servers to use')
	.option('--show-hook-names', 'Prints names of the available hooks as the command runs')
	.option('-h, --help', 'Show help')
	.option('-v, --verbose', 'Verbose output')
	//.option('-v, --verbose', 'Verbose output')
	.action(commands.orup);

prog
	.command('tailwind <command>', 'Build/Purge tailwind css.')
	.describe('Build/Purge tailwind css.')
	.option('--cwd', 'A directory to use instead of $PWD', '.')
	.option('-v, --verbose', 'Verbose output')
	.action(commands.tailwind);

/*
prog
	.command('list')
	.describe('List official templates')
	.action(commands.list);
*/

prog.parse(process.argv);
