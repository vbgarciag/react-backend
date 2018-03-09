import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import NavBar from './NavBar';
import AuthService from '../components/AuthService';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            users: []
        }

        this.Auth = new AuthService();
    }

    componentWillMount() {
        if(!this.Auth.loggedIn()) {
            this.props.history.replace('/')
        }

        console.log(this.Auth.getProfile());
    }

    componentDidMount() {
        fetch('/all_users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
        if(this.Auth.loggedIn()) {
            this.props.history.replace('/home')
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <NavBar name={'Users'} history={this.props.history}/>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Email</TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this.state.users.map((user, i) =>
                                <TableRow>
                                    <TableRowColumn key={user.id}>{user.id}</TableRowColumn>
                                    <TableRowColumn key={user.id}>{user.first_name}</TableRowColumn>
                                    <TableRowColumn key={user.id}>{user.email}</TableRowColumn>
                                    <TableRowColumn>
                                        <RaisedButton
                                        label="Remove"
                                        secondary={true}
                                        />
                                    </TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </MuiThemeProvider>
        );
    };
}