import React from 'react';
import { storiesOf } from '@storybook/react';
import RMFooter from '@realmassive/rmc-footer';
import StoryRouter from 'storybook-react-router';
import styles from '@sambego/storybook-styles';
import { linkTo } from '@storybook/addon-links'
import { withReadme }  from 'storybook-readme';
import README from '../README.md';

const readme = `
<p>Footer README<p>
`;

storiesOf('Footer [rmc-footer]', module)
    .addDecorator(withReadme(readme))
    .addDecorator(StoryRouter())
    .add('Footer', () => (
        <RMFooter
            corpHomeUrl={'#'}
            corpContactUrl={'#'}
            fixed={false}
        />
    ))