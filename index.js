'use strict';
const http = require('http');

/**
 * apiMultiFetcher express middleware
 * @param req
 * @param res
 * @param next
 * @returns {Promise}
 */
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
        return new Promise((resolve, reject) => {
            res.write(`"${resource}":`);

            const handleWritableStream = (response) => {
                response.on('data', (chunk) => {
                    res.write(chunk);
                });
                response.on('error', (err) => {
                    reject(err);
                });
                response.on('end', () => {
                    if (resource !== resources[resources.length - 1]) {
                        res.write(',');
                    } else {
                        res.write('}');
                        res.end();
                    }
                    resolve();
                });
            };

            http.get(requestOpts, (response) => {
                handleWritableStream(response);
            });

        }).catch((err) => {
            throw new Error(err);
        });
    }

    next();
}

module.exports = apiMultiFetcher;

