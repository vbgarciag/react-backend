import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AuthService from '../components/AuthService';
import Dialog from 'material-ui/Dialog';

export default class LoginForm extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            open: false,
            message: '',
            title: '',
            fieldRequiredEmail: '',
            fieldRequiredPassword: ''
        }
        this.Auth = new AuthService();
    }

    handleOpen = (title, message) => {
        this.setState({
            open: true,
            message: message,
            title: title
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };


    componentWillMount() {
        if(this.Auth.loggedIn()) {
            this.props.history.replace('/home')
        }
    }

    handleClick(e) {
        e.preventDefault();

        if(!this.handleValidate())
            return false;

        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                if(res.status)
                    this.props.history.replace('/home');
                else
                    this.handleOpen('Login failure', res.message)
            })
            .catch(function(err) {
                alert(err);
                console.log("Error logging in", err);
            });
    }

    handleValidate(){
        this.setState({fieldRequiredEmail: ''})
        this.setState({fieldRequiredPassword: ''})

        if(this.state.email === '') {
            this.setState({fieldRequiredEmail: 'This field is required'})
            return false;
        }
        if(this.state.password === '') {
            this.setState({fieldRequiredPassword: 'This field is required'})
            return false;
        }

        return true;
    }

    render() {

        const actions = [
            <RaisedButton
                label="Ok"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <MuiThemeProvider>
                <div>
                    <TextField
                        floatingLabelText="Username"
                        errorText={this.state.fieldRequiredEmail}
                        onChange={(event, newValue) => this.setState({email: newValue}) }/>
                    <br/>
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                        errorText={this.state.fieldRequiredPassword}
                        onChange={(event, newValue) => this.setState({password: newValue})}/>
                    <br/>
                    <br/>
                    <RaisedButton
                        label="Login"
                        primary={true}
                        onClick={(event) => this.handleClick(event)}/>

                    <Dialog
                        title={this.state.title}
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        {this.state.message}
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    };
}