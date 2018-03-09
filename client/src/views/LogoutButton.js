import React from 'react';
import Button from 'material-ui/RaisedButton';
import AuthService from '../components/AuthService';
const Auth = new AuthService();

class LogoutButton extends React.Component {

    render() {
        return(
            <Button
            label="Logout"
            primary={true}
            onClick={this.handleLogout.bind(this)}/>
        )
    }
    handleLogout(){
        Auth.logout()
        this.props.history.replace('/');
    }
}

export default LogoutButton;