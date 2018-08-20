let _singleton = Symbol();
const CUSTOMER_API_URL ='https://pizzazz-db-server.herokuapp.com';

// 'https://pizzazz-db-server.herokuapp.com/api/user';
//
 const CUSTOMER_API_Local = 'http://localhost:8080/api/user/';

const CUSTOMER_API_URL2 ='https://pizzazz-db-server.herokuapp.com/api/user/';
//
// const CUSTOMER_API_CONST =
//     'https://pizzazz-db-server.herokuapp.com/api/';
/*'http://localhost:8080/api/user';*/
// 'http://localhost:8080/api/user';

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
        return fetch(CUSTOMER_API_URL)
            .then(function(response){
                return response.json();
            });
    }


    findAllReviewers() {
        return fetch(CUSTOMER_API_URL+'/api/reviewers')
            .then(function(response){
                return response.json();
            });
    }

    findAllOwners() {
        return fetch(CUSTOMER_API_URL+'/api/owners')
            .then(function(response){
                return response.json();
            });
    }

    findAllCustomers() {
        return fetch(CUSTOMER_API_URL+'/api/customers')
            .then(function(response){
                return response.json();
            });
    }

    findAllSalonsFromAdmin() {
        return fetch(CUSTOMER_API_URL+'/api/salonsFromAdmin')
            .then(function(response){
                return response.json();
            });
    }

    findUserByUsername(username) {
        return fetch(CUSTOMER_API_URL2 + username + '/username', {
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response){
                return response.json();
            })
    }


    findUserByUsernameAndPassword(user){
        return fetch(CUSTOMER_API_URL+ '/api/username', {
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
        return fetch(CUSTOMER_API_URL + '/api/checkLogin', {
            method: 'get',
            credentials : 'include',
            headers: {
                'content-type': 'application/json'
            },
        }).then(function (response) {
            return response.json();
        })}

    createUser(user) {
        return fetch(CUSTOMER_API_URL2, {
            body: JSON.stringify(user),
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}



    createUserFromAdminPage(user) {
         fetch(CUSTOMER_API_URL2, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}


    deleteUser(userId) {
        fetch(CUSTOMER_API_URL + '/api/user/' + userId, {
            method: 'delete'
        }).then(function (response) {
            return response.json();
        })}
    

    updateUser(userId,user) {
        return fetch(CUSTOMER_API_URL2  + userId, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })}

    findReviewsById(userId){
        return fetch(CUSTOMER_API_URL+'/api/reviews/'+userId+'/user', {
            method: 'get',
            credentials : 'include',
            headers: {
                'content-type': 'application/json'
            },
        }).then(function (response) {
            return response.json();
        })}

    findLikesById(userId){
        return fetch(CUSTOMER_API_URL+'/api/likes/'+userId+'/user', {
            method: 'get',
            credentials : 'include',
            headers: {
                'content-type': 'application/json'
            },
        }).then(function (response) {
            return response.json();
        })}


    findProfileById(userId){
        return fetch('https://pizzazz-db-server.herokuapp.com/api/user/'+userId, {
            method: 'get',
            credentials : 'include',
            headers: {
                'content-type': 'application/json'
            },
        }).then(function (response) {
            return response.json();
        })}

    createInvite(invitation) {
        return fetch('https://pizzazz-db-server.herokuapp.com/api/invite', {
            body: JSON.stringify(invitation),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}

        logout()
        {
            return fetch('https://pizzazz-db-server.herokuapp.com/api/logout', {
                credentials: 'include',
                method: 'post'
            }).then(function (response) {
                return response;
            })
        }
}
export default UserService;
