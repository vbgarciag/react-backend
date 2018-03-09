import React from 'react';
import AppBar from 'material-ui/AppBar';
import LogoutButton from '../views/LogoutButton';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const NavBar = (props) => (
    <AppBar
        title={props.name}
        iconElementRight={<LogoutButton history={props.history}/>}
    />
);

export default NavBar;