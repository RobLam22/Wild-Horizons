import http from 'node:http';
import { getDataFromDB } from './database/db.js';
import { sendJSONres } from './utils/sendJSONres.js';
import { filterData } from './utils/getDataByPathParams.js';
import { getDataByQueryParams } from './utils/getDatabyQueryParams.js';
const PORT = 8000;

// async & await
const server = http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const destinations = await getDataFromDB(); // needs await because it's an async function in db.js

    if (urlObj.pathname === '/api' && req.method === 'GET') {
        const queryParams = Object.fromEntries(urlObj.searchParams);
        const filteredData = getDataByQueryParams(destinations, queryParams);
        sendJSONres(res, 'application/json', 200, filteredData);
    } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = req.url.split('/').pop();
        const filteredData = filterData(destinations, 'continent', continent);
        sendJSONres(res, 'application/json', 200, filteredData);
    } else if (req.url.startsWith('/api/country') && req.method === 'GET') {
        const country = req.url.split('/').pop();
        const filteredData = filterData(destinations, 'country', country);
        sendJSONres(res, 'application/json', 200, filteredData);
    } else {
        sendJSONres(res, 'application/json', 404, {
            error: 'not found',
            message: 'The requested route does not exist',
        });
    }
});

// promises with .then
// const server = http.createServer((req, res) => {
//     if (req.url === '/api' && req.method === 'GET') {
//         getDataFromDB() // fetch(getDataFromDB) is required if getDataFromDB is a url instead of a function
//             .then((destinations) => {
//                 console.log(destinations);
//                 res.end(JSON.stringify(destinations));
//             })
//             .catch((error) => {
//                 console.error(error);
//                 res.end(JSON.stringify({ error: 'Internal Server Error' }));
//             });
//     } else {
//         res.end('Not Found');
//     }
// });

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
