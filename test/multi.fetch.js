const express = require('express');
const apiMultiFetcher = require('../index');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const testApp = express();
const url = '/api/resources';

testApp.get(url, apiMultiFetcher);

const usersResponse = {
    status: 'ok',
    data: [
        {name: 'User1', id: 1},
        {name: 'User2', id: 2},
        {name: 'User3', id: 3},
        {name: 'User4', id: 4},
        {name: 'User5', id: 5}
    ]
};

testApp.get('/api/users', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send(usersResponse);
});

describe('API multi fetcher middleware', () => {
    context('single API call', () => {
        it('should fetch all users', (done) => {
            chai.request(testApp)
                .get('/api/users')
                .end((err, res) => {
                    expect(res).to.be.a('object');
                    expect(res).to.have.property('status').to.equal(200);
                    expect(res.body).to.deep.equal(usersResponse);
                    expect(err).to.not.exist;
                    done();
                })
        });
    });
});