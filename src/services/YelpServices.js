let _singleton = Symbol();
const YELP_API_URL ='https://rocky-caverns-99102.herokuapp.com';
// const YELP_API_URL ='http://localhost:4000';


export default class YelpApiService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new YelpApiService(_singleton);
        return this[_singleton]
    }

    searchSalons(keyword, location) {
        const searchString = {
            searchTerm: keyword,
            location: location
        };
        return fetch(YELP_API_URL + '/search', {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(searchString),
            method: 'post'
        }).then(function (response) {
            return response.json();

        })
    }

    getSalon = (id) =>
        fetch(YELP_API_URL + '/business/' + id)
            .then(response => response.json())

    getReviews = (id) =>
        fetch(YELP_API_URL + '/business/' + id + '/reviews')
            .then(response => response.json())

    getAutocomplete = (keyword, location) => {
        const searchString = {
            text: keyword,
            locale: location
        };
        return fetch(YELP_API_URL + '/autocomplete', {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(searchString),
            method: 'post'
        }).then(function (response) {
            return response.json();

        })
    }
}
