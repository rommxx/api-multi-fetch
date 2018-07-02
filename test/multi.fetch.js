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
        {id: 1, name: 'User1'},
        {id: 2, name: 'User2'},
        {id: 3, name: 'User3'},
        {id: 4, name: 'User4'},
        {id: 5, name: 'User5'}
    ]
};

const customersResponse = {
    status: 'ok',
    data: [
        {id: 1, name: 'Customer1'},
        {id: 2, name: 'Customer2'},
        {id: 3, name: 'Customer3'},
        {id: 4, name: 'Customer4'},
        {id: 23, name: 'Customer23'}
    ]
};

const coutriesResponse = {
    status: 'ok',
    data: [
        {id: 1, name: 'Country1'},
        {id: 2, name: 'Country1'},
        {id: 3, name: 'Country1'},
        {id: 10, name: 'Country1'},
    ]
};

testApp.get('/api/users', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(usersResponse);
});

testApp.get('/api/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const selectedUser = usersResponse.data.find(user => user.id === userId);

    res.set('Content-Type', 'application/json');
    res.send(selectedUser);
});

testApp.get('/api/customers', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(customersResponse);
});

testApp.get('/api/customers/:customerId', (req, res) => {
    const customerId = parseInt(req.params.customerId);
    const selectedCustomer = customersResponse.data.find(customer => customer.id === customerId);

    res.set('Content-Type', 'application/json');
    res.send(selectedCustomer);
});

testApp.get('/api/countries', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(coutriesResponse);
});

describe('API multi fetcher middleware', () => {
    context('by single API call', () => {
        it('should fetch all users', (done) => {
            const url = '/api/users';
            chai.request(testApp)
                .get(url)
                .end((err, res) => {
                    expect(res).to.be.a('object');
                    expect(res).to.have.property('status').to.equal(200);
                    expect(res.body).to.deep.equal(usersResponse);
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
                    expect(res.body).to.deep.equal({id: 5, name: 'User5'});
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
                    expect(res.body).to.deep.equal(customersResponse);
                    expect(err).to.equal(null);
                    done();
                })
        });
    });

    context('by multiple API call', () => {
        it('should fetch multiple resources in one go', (done) => {
            const url = '/api/resources?users=api/users&customer=api/customers/23&countries=api/countries';
            chai.request(testApp)
                .get(url)
                .end((err, res) => {
                    expect(res).to.be.a('object');
                    expect(res).to.have.property('status').to.equal(200);
                    expect(res.body.users).to.deep.equal(usersResponse);
                    expect(res.body.countries).to.deep.equal(coutriesResponse);
                    expect(res.body.customer).to.deep.equal({id: 23, name: 'Customer23'});
                    expect(err).to.equal(null);
                    done();
                })
        });
    });
});