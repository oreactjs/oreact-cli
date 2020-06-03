exports.TEMPLATES_REPO_URL =
	'https://api.github.com/users/oreactjs-templates/repos';

exports.CUSTOM_TEMPLATE = {
	value: 'custom',
	title: 'Custom',
	description: 'Use your own template',
};

exports.FALLBACK_TEMPLATE_OPTIONS = [
	{
		value: 'oreactjs-templates/default',
		title: 'default',
		description: 'The default template for Oreact CLI',
	}
];

exports.TEMPLATES_CACHE_FOLDER = '.cache';
exports.TEMPLATES_CACHE_FILENAME = 'oreact-templates.json';
