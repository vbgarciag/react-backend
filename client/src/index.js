import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Users from './components/Users';
import Home from './components/Home';
import Login from './views/Login';
import Alert from './views/Alert';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/users" component={Users}/>
            <Route path="/alert" component={Alert}/>
        </div>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
