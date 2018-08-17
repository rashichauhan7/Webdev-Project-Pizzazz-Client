let _singleton = Symbol();
const SALON_API_URL =
    'http://localhost:8080/api/user';
/*'https://hw1akriti.herokuapp.com/api/course';*/


class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }
    findAllUsers() {
        return fetch(SALON_API_URL)
            .then(function(response){
                return response.json();
            });
    }
    findUserByUsernameAndPassword(user){
        return fetch('http://localhost:8080/api/username', {
            method: 'post',
            credentials : 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(function (response) {
            return response.json();
        })}

    findCurrentUser(){
        return fetch('http://localhost:8080/api/checkLogin', {
            method: 'get',
            credentials : 'include',
            headers: {
                'content-type': 'application/json'
            },
        }).then(function (response) {
            return response.json();
        })}

    createUser(user) {
        return fetch(SALON_API_URL, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}

    deleteUser(userId) {
        return fetch(SALON_API_URL + '/' + userId, {
            method: 'delete'
        })
            .then(function(response){
                return response;
            });
    }

    updateUser(userId,user) {
        return fetch(SALON_API_URL + '/' + userId, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })}
}
export default UserService;
