import when from 'when';
import request from 'reqwest';
//import {LOGIN_URL} from "../constants/LoginConstants";

class UsersService {
    All() {
        return this.handleAll(when(request({
            url: 'http://localhost:3001/all_users',
            method: 'GET',
            crossOrigin: true,
            type: 'json',
        })))
    }

    handleAll(usersPromise) {
        return usersPromise
            .then(function(response) {
                return response;
            });
    }
}

export default new UsersService()