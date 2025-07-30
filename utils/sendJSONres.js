export function sendJSONres(res, mimeType, statusCode, payload) {
    res.setHeader('Content-Type', mimeType);
    res.statusCode = statusCode;
    res.end(JSON.stringify(payload));
}
