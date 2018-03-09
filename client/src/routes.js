import React from 'react';
import { Route , Switch } from 'react-router-dom';

import Login from './views/Login';
import Home from './components/Home';
import App from "./App";

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/home" component={Home}/>
        </Switch>
    </App>;

export default AppRoutes;