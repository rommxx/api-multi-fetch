const express = require('express');
const apiMultiFetcher = require('../index');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const fixtures = require('./fixtures');

const testApp = express();
const url = '/api/resources';

testApp.get(url, apiMultiFetcher);

testApp.get('/api/users', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(fixtures.users);
});

testApp.get('/api/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const selectedUser = fixtures.users[userId];

    res.set('Content-Type', 'application/json');
    res.send(selectedUser);
});

testApp.get('/api/customers', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(fixtures.customers);
});

testApp.get('/api/customers/:customerId', (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const selectedCustomer = fixtures.customers[customerId];

    res.set('Content-Type', 'application/json');
    res.send(selectedCustomer);
});

testApp.get('/api/countries', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(fixtures.countries);
});

describe('API multi fetcher middleware', () => {
    context('GET single API call', () => {
        it('should fetch all users', (done) => {
            const url = '/api/users';
            chai.request(testApp)
                .get(url)
                .end((err, res) => {
                    expect(res).to.be.a('object');
                    expect(res).to.have.property('status').to.equal(200);
                    expect(res.body).to.deep.equal(fixtures.users);
                    expect(err).to.equal(null);
                    done();
                })
        });

        it('should fetch user by Id', (done) => {
            const url = '/api/users/5';
            chai.request(testApp)
                .get(url)
                .end((err, res) => {
                    expect(res).to.be.a('object');
                    expect(res).to.have.property('status').to.equal(200);
                    expect(res.body).to.have.property('id').to.equal(5);
                    expect(res.body).to.have.property('name');
                    expect(err).to.equal(null);
                    done();
                })
        });

        it('should fetch all customers', (done) => {
            const url = '/api/customers';
            chai.request(testApp)
                .get(url)
                .end((err, res) => {
                    expect(res).to.be.a('object');
                    expect(res).to.have.property('status').to.equal(200);
                    expect(res.body).to.deep.equal(fixtures.customers);
                    expect(err).to.equal(null);
                    done();
                })
        });
    });

    context('GET multiple API call', () => {
        it('should fetch multiple resources in one go', (done) => {
            const url = '/api/resources?users=api/users&customer=api/customers/23&countries=api/countries';
            chai.request(testApp)
                .get(url)
                .end((err, res) => {
                    expect(res).to.be.a('object');
                    expect(res).to.have.property('status').to.equal(200);
                    expect(res.body.users).to.deep.equal(fixtures.users);
                    expect(res.body.countries).to.deep.equal(fixtures.countries);
                    expect(res.body.customer).to.have.property('id').to.equal(23);
                    expect(res.body.customer).to.have.property('name');
                    expect(err).to.equal(null);
                    done();
                })
        });
    });
});