import React from 'react';

//material
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from '../components/LoginForm';
import logo from '../img/mabe.jpg';
import AuthService from '../components/AuthService';

const styles = {
    paper: {
        minHeight: '100px',
        width: '30%',
        padding: '40px',
        textAlign: 'center',
        margin: '0 auto',
        verticalAlign: 'middle',
        marginTop: '10%'
    },
    container: {
        textAlign: 'center'
    }
};

const style = {
    margin: 5,
    width: 150
};

export default class Login extends React.Component {

    constructor() {
        super();

        this.Auth = new AuthService();
    }

    componentWillMount() {
        if(this.Auth.loggedIn()) {
            this.props.history.replace('/home')
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={styles.container}>
                    <Paper style={styles.paper}>
                        <img src={logo} style={style} alt=""/>
                        <br/>
                        <LoginForm history={this.props.history}/>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    };
}