import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './NavBar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class Home extends React.Component {

    state = {users: []}

    componentDidMount() {
        fetch('/all_users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }


    render() {
        return (
            <MuiThemeProvider>
                <NavBar name={'Users'}/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.state.users.map(user =>
                            <TableRow>
                                <TableRowColumn>{user.id}</TableRowColumn>
                                <TableRowColumn>{user.first_name}</TableRowColumn>
                                <TableRowColumn>{user.email}</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </MuiThemeProvider>
        );
    };
}