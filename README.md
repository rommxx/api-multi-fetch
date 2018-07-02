# api-multi-fetch

[![Build Status](https://travis-ci.org/rommxx/api-multi-fetch.svg?branch=master)](https://travis-ci.org/rommxx/api-multi-fetch)

API Multi Fetcher express middleware

## Installation

```bash
$ npm install api-multi-fetch
```
The [npm](https://www.npmjs.com) package provides an [Express](https://expressjs.com/) middleware for the multiple API requests in one go.

### Usage
Adding middleware in your express app
```js
app.get('/api/resources', require('api-multi-fetch'));
```
