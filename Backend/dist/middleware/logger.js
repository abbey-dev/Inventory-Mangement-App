"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Index(req, res, next) {
    console.log(`${req.method} request on ${req.path}`);
    next();
    console.log(`Got a ${res.statusCode} response`);
}
exports.default = Index;
