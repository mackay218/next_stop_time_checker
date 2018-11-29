const axios = require('axios');
const expect = require('chai').expect;
const nock = require('nock');

//tests to make sure getting data from metro transit api will work
describe('Get route info tests', () => {
    it('Get todays routes', () => {
        return getRoutes().then(response => {
            //expect an object back
            expect(typeof response).to.equal('object');
        });
    });
});

const getRoutes = require('../src/App.test.js').getTodaysRoutes;

// function getRoutes() {
//     return axios.get(`https://svc.metrotransit.org/NexTrip/Routes?format=json`)
// }