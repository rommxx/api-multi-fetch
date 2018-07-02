const http = require('http');

async function apiMultiFetcher(req, res, next) {
    const { query:queryParams, headers } = req;
    const [ hostname, port ] = headers.host.split(':');
    const resources = Object.keys(queryParams);

    res.setHeader('Content-Type', 'application/json');
    res.write('{');

    for (const resource of resources) {
        const path = `/${queryParams[resource]}`;
        await requestAsync(resource, {hostname, port, path});
    }

    function requestAsync (resource, requestOpts) {
        
    }

    next();
}

module.exports = apiMultiFetcher;

