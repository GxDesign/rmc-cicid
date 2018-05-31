const path = require('path');
const fs = require('fs');
const buildChainConfig = require('@realmassive/component-build-chain').config;

// Build exclusions for symlinked rmc-* directories so we don't try to resolve the
// imported modules for these directories that are already built
const exclusions = [];

const rmModules = path.resolve(__dirname, '..', 'node_modules', '@realmassive');
const items = fs.readdirSync(rmModules);

items.forEach(item => {
	// If it's an RMC, resolve its symlink
	if (item.indexOf('rmc-') === 0) {
		const fullPath = path.resolve(rmModules, item);
		const realPath = fs.realpathSync(fullPath);

		// If paths don't match we have a symlink
		if (fullPath !== realPath) {
			exclusions.push(realPath);
		}
	}
});

module.exports = (storybookBaseConfig, configType) => {
	storybookBaseConfig.resolve.modules = ['node_modules', path.join('../', __dirname, 'node_modules')];

	if (exclusions.length > 0) {
		const babelConfig = storybookBaseConfig.module.rules[0];
		storybookBaseConfig.resolve.symlinks = false;
	}

	storybookBaseConfig.module.rules.splice(1, 1);

	storybookBaseConfig.module.rules.push({
		test: /\.md$/,
		use: [{
			loader: 'html-loader'
		}, {
    		loader: 'markdown-loader'
		}]
	})

	return storybookBaseConfig;
};
// {
// 	module: buildChainConfig.module
// };