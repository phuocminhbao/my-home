import { REASON_PHRASE, STATUS_CODE } from '~/contants';
import type { ReasonPhrase, StatusCode } from '~/types';
import Logger from '../logger';

class ErrorResponse extends Response {
    constructor(
        message: string,
        reason: ReasonPhrase,
        statusCode: StatusCode,
        request: Request,
        context: string
    ) {
        const jsonErrorBody = JSON.stringify({
            reason,
            code: statusCode,
            error: message
        });
        super(jsonErrorBody, { status: statusCode });
        const LOGGER = Logger.Instance.getLogger();
        const url = new URL(request.url);
        LOGGER.error(message, {
            context,
            requestId: url.pathname + url.search
        });
    }
}

class BadRequestResponse extends ErrorResponse {
    constructor(message: string, request: Request, context: string) {
        super(message, REASON_PHRASE.BAD_REQUEST, STATUS_CODE.BAD_REQUEST, request, context);
    }
}

class ForbiddenResponse extends ErrorResponse {
    constructor(message: string, request: Request, context: string) {
        super(message, REASON_PHRASE.FORBIDDEN, STATUS_CODE.FORBIDDEN, request, context);
    }
}

export default ErrorResponse;

export { BadRequestResponse, ForbiddenResponse };
