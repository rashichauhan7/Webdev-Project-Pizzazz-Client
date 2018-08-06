let _singleton = Symbol();
const YELP_API_URL ='http://localhost:4000/search';

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

    searchSalons(keyword, location)
    {
        const searchString = {
            searchTerm: keyword,
            location: location
        };
        return fetch(YELP_API_URL,{
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
