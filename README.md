# api-multi-fetch

[![Build Status](https://travis-ci.org/rommxx/api-multi-fetch.svg?branch=master)](https://travis-ci.org/rommxx/api-multi-fetch)

API Multi Fetcher express middleware.
The [npm](https://www.npmjs.com) package provides an [Express](https://expressjs.com/) middleware for the multiple API requests in one go.

## Installation

```bash
$ npm install api-multi-fetch
```

### Usage
Add middleware in your express app
```js
app.get('/api/resources', require('api-multi-fetch'));
```

Suppose you have an API
- GET api/users, api/users/:id
- GET api/customers, api/customers:id
- GET api/countries etc

Instead you can GET all resources in one go.

Example of final use

GET api/resources ? users=api/users & customer=api/customers/23 & countries=api/countries ..
returns {users: [..], customer: {..}, countries: [..] }