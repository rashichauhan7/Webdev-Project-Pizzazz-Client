let _singleton = Symbol();
const SALON_API_URL =
    'https://pizzazz-db-server.herokuapp.com/api/salon';
   /* 'http://localhost:8080/api/salon';*/
/*'https://hw1akriti.herokuapp.com/api/course';*/


class SalonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new SalonService(_singleton);
        return this[_singleton]
    }
    findAllSalons() {
        return fetch(SALON_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findCurrentSalon(){
        return fetch('http://localhost:8080/api/checkSalon', {
            method: 'get',
            credentials : 'include',
            headers: {
                'content-type': 'application/json'
            },
        }).then(function (response) {
            return response.json();
        })}

    createSalon(salon) {
        return fetch(SALON_API_URL, {
            body: JSON.stringify(salon),
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}

    updateSalon(salonId,salon) {
        return fetch(SALON_API_URL + '/' + salonId, {
            body: JSON.stringify(salon),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })}
}
export default SalonService;
