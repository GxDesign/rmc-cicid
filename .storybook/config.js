import { configure, addDecorator } from '@storybook/react';
import '@storybook/addon-console';
import { withConsole } from '@storybook/addon-console';
import { setDefaults } from '@storybook/addon-info';

// addon-info
setDefaults({
  header: true, // Toggles display of header with component name and description
  inline: true
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// Require built, distributed files
const req = require.context('../node_modules/@realmassive', true, /\@realmassive\/rmc\-.+\/dist\/.+(.js|.jsx)$/);
// Require actual stories
const storyReq = require.context('../stories', true, /\.js$/);

function loadStories() {
	require('../stories/header.js');
	require('../stories/icons.js');
	require('../stories/footer.js');
	req.keys().forEach((filename) => req(filename))
	// storyReq.keys().forEach((filename) => req(filename))
	// You can require as many stories as you need.
}

configure(loadStories, module);