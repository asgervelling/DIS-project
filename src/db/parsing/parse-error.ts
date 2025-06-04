export class ParseError extends Error {
  constructor(message: string, lineNo: number) {
    super(`Line ${lineNo}: ${message}`);
  }
}
