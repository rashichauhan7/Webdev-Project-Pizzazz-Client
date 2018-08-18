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

    findSalonById(salonId){
        return fetch('https://pizzazz-db-server.herokuapp.com/api/salon/' + salonId, {
            method: 'get',
            credentials : 'include',
            headers: {
                'content-type': 'application/json'
            },
        }).then(function (response) {
            return response.json();
        })
    }

    findSalonByYelpId(salonId){
        return fetch('http://localhost:8080/api/salonApi/' + salonId, {
            method: 'get',
            credentials : 'include',
            headers: {
                'content-type': 'application/json'
            },
        }).then(function (response) {
            return response.json();
        })
    }

    findCurrentSalon(){
        return fetch('https://pizzazz-db-server.herokuapp.com/api/checkSalon', {
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

    createApiSalon(salonId) {
        return fetch('http://localhost:8080/api/salonforApi/' + salonId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}

    updateSalon(salon, salonId) {
        return fetch(SALON_API_URL + '/' + salonId, {
            body: JSON.stringify(salon),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })}

    createAppointment(appt) {
        return fetch('http://localhost:8080/api/appointment',{
            body: JSON.stringify(appt),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

    createReview(review) {
        return fetch('http://localhost:8080/api/review',{
            body: JSON.stringify(review),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

    getSalonApp(salonId) {
        return fetch('http://localhost:8080/api/salon/' + salonId + '/appointments', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        })
    }

    getSalonReviews(salonId) {
        return fetch('http://localhost:8080/api/salon/' + salonId + '/reviews', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        })
    }

    updateAppointments(appts){
        return fetch('http://localhost:8080/api/appointments',{
            method: 'put',
            body: JSON.stringify(appts),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        })
    }

    updateReviews(reviews){
        return fetch('http://localhost:8080/api/reviews',{
            method: 'put',
            body: JSON.stringify(reviews),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        })
    }


}
export default SalonService;
