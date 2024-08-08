import { REASON_PHRASE, STATUS_CODE } from '~/constants';
import type { ReasonPhrase, StatusCode } from '~/types';
import 'source-map-support/register';

class ErrorResponse extends Response {
    constructor(error: string, reason: ReasonPhrase, statusCode: StatusCode) {
        const jsonErrorBody = JSON.stringify({
            reason,
            code: statusCode,
            error
        });
        super(jsonErrorBody, { status: statusCode });
    }
}

class BadRequestResponse extends ErrorResponse {
    constructor(error: string) {
        super(error, REASON_PHRASE.BAD_REQUEST, STATUS_CODE.BAD_REQUEST);
    }
}

class ForbiddenResponse extends ErrorResponse {
    constructor(error: string) {
        super(error, REASON_PHRASE.FORBIDDEN, STATUS_CODE.FORBIDDEN);
    }
}

class InternalServerError extends ErrorResponse {
    constructor(error: string) {
        super(error, REASON_PHRASE.INTERNAL_SERVER_ERROR, STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

export default ErrorResponse;

export { BadRequestResponse, ForbiddenResponse, InternalServerError };
