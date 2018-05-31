import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '@realmassive/rmc-header';
import StoryRouter from 'storybook-react-router';
import styles from '@sambego/storybook-styles';
import { linkTo } from '@storybook/addon-links'
import { withReadme }  from 'storybook-readme';
import README from '../README.md';

const readme = `
<p>Note that due to inexplicable differences in how Google Fonts are loaded into different environments,
the actual header fonts in practice should be much thinner. See the header in \`autopilot-business\`:</p>
<img src="https://i.imgur.com/RwAfsw2.png" />
`;

storiesOf('Header [rmc-header]', module)
    // .addDecorator((story, context) => withInfo(`
    //     Note that due to inexplicable differences in how Google Fonts are loaded into different environments,
    //     the actual header fonts in practice should be much thinner. See the header in \`autopilot-business\`:

    //     ![](https://i.imgur.com/RwAfsw2.png)
    // `)(story)(context))
    .addDecorator(withReadme(readme))
    .addDecorator(StoryRouter())
    .add('logged out', () => (
        <Header
            fixed={false}
            isLoggedIn={false}
            isLoading={false}
            homeLink={'#'}
            loginLink={'#'}
            signupLink={'#'}
            onLinkClick={() => {}}
            onLogOut={() => {}}
            />
    ))
    .add('logged in', () => (
        <Header
            fixed={false}
            isLoggedIn={true}
            isLoading={false}
            firstNameLetter={'W'}
            homeLink={'#'}
            loginLink={'#'}
            signupLink={'#'}
            onLinkClick={() => {}}
            onLogOut={() => {}}
            />
    ));
