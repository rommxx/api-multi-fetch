const dummyjson = require('dummy-json');

const usersTemplate = `
[
    {{#repeat 50}}
    {
      "id": {{@index}},
      "name": "{{firstName}}"
    }
    {{/repeat}}
]
`;

const customersTemplate = `
[
    {{#repeat 50}}
    {
      "id": {{@index}},
      "name": "{{firstName}}"
    }
    {{/repeat}}
]
`;

const countriesTemplate = `
[
    {{#repeat 50}}
    {
      "id": {{@index}},
      "name": "{{country}}"
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