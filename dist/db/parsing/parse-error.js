"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = void 0;
class ParseError extends Error {
    constructor(message, lineNo) {
        super(`Line ${lineNo}: ${message}`);
    }
}
exports.ParseError = ParseError;
