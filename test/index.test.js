const axios = require('axios');
const expect = require('chai').expect;
const nock = require('nock');

//get todays routes
const getRoutes = require('./index.js').getTodaysRoutes;
const getRouteDirections = require('./index.js').getRouteDirections;

//directions test response
const testResponse = require('./testResponse');

//tests to make sure getting data from metro transit api will work
describe('Get route info tests', () => {
    it('Get todays routes', () => {
        return getRoutes().then(response => {
            //expect an object back
            expect(typeof response).to.equal('object');
        });
    });
    describe('Get specific route direction info test', () => {
        beforeEach(() => {
            nock('https://svc.metrotransit.org')
                .get('/NexTrip/Directions/901?format=json')
                .reply(200, testResponse);
        });

        it('Get route directions by route number', () => {
            return getRouteDirections('901')
                .then((response) => {
                    //check that test response is an object
                    expect(typeof testResponse).to.equal('object');

                    //test length of direction response array
                    //failing test
                    //expect(testResponse.directionResponse.length).to.equal(5)
                    
                    //passing test
                    expect(testResponse.directionResponse.length).to.equal(2)

                    //test text in directions array
                    //failing test
                    //expect(testResponse.directionResponse[0].Text).to.equal('EASTBOUND')

                    //passing test
                    expect(testResponse.directionResponse[0].Text).to.equal('NORTHBOUND')
                });
        });
    });
    
});


