import { REASON_PHRASE, STATUS_CODE } from '~/contants';
import type { ReasonPhrase, StatusCode } from '~/types';

class ErrorResponse extends Response {
    constructor(message: string, reason: ReasonPhrase, statusCode: StatusCode) {
        const jsonErrorBody = JSON.stringify({
            reason,
            code: statusCode,
            error: message
        });
        super(jsonErrorBody, { status: statusCode });
    }
}

class BadRequestResponse extends ErrorResponse {
    constructor(message: string) {
        super(message, REASON_PHRASE.BAD_REQUEST, STATUS_CODE.BAD_REQUEST);
    }
}

class ForbiddenResponse extends ErrorResponse {
    constructor(message: string) {
        super(message, REASON_PHRASE.FORBIDDEN, STATUS_CODE.FORBIDDEN);
    }
}

export default ErrorResponse;

export { BadRequestResponse, ForbiddenResponse };
