import when from 'when';
import request from 'reqwest';
//import {LOGIN_URL} from "../constants/LoginConstants";

class AuthService {

    constructor(domain) {
        this.domain = domain || `http://localhost:3001`;
    }

    login(email, password) {
        return this.handleAuth(when(request({
            url: 'http://localhost:3001/users',
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                email, password
            }
        })))
    }

    handleAuth(loginPromise) {
        return loginPromise
            .then(function(response) {
                var jwt = response.token;
                //LoginActions.loginUser(jwt);
                console.log(response);
                return true;
            });
    }
}

export default new AuthService()