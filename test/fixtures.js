var dummyjson = require('dummy-json');

const usersTemplate = `
[
    {{#repeat 10}}
    {
      "id": {{@index}},
      "name": "{{firstName}}"
    }
    {{/repeat}}
]
`;

const customersTemplate = `
[
    {{#repeat 10}}
    {
      "id": {{@index}},
      "name": "{{firstName}}"
    }
    {{/repeat}}
]
`;

const countriesTemplate = `
[
    {{#repeat 10}}
    {
      "id": {{@index}},
      "name": "{{firstName}}"
    }
    {{/repeat}}
]
`;

const users = JSON.parse(dummyjson.parse(usersTemplate));
const customers = JSON.parse(dummyjson.parse(customersTemplate));
const countries = JSON.parse(dummyjson.parse(countriesTemplate));

module.exports = {
    users: users,
    customers: customers,
    countries: countries
};