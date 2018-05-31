import React from 'react';
import { storiesOf } from '@storybook/react';
import Icons from '@realmassive/rmc-icons';
import { withInfo } from '@storybook/addon-info';

const icons = [
    'AddPerson',
    'AlertCircle',
    'ArrowBack',
    'ArrowLeft',
    'ArrowRight',
    'CheckCircle',
    'ChevronLeft',
    'ChevronRight',
    'City',
    'Close',
    'Facebook',
    'Hamburger',
    'Help',
    'Image',
    'LinkedIn',
    'List',
    'LogIn',
    'LogOut',
    'Logo',
    'Map',
    'Pin',
    'Search',
    'Settings',
    'Share',
    'Tune',
    'Twitter',
    'YouTube'
];


const stories = storiesOf('Icons [rmc-icons]', module)
    .addDecorator((story, context) => withInfo()(story)(context))

icons.forEach(icon => {
    stories.add(icon, () => (
        <Icons width="50px" height="50px" icon={icon[0].toLowerCase() + icon.substring(1)} />
    ))
});
