export default class ErrorResponse {
    message: string;
    statusCode: number;
    constructor(statusCode: number, message: string) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
