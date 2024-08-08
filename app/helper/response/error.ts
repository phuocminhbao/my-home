import { REASON_PHRASE, STATUS_CODE } from '~/constants';
import type { ReasonPhrase, StatusCode } from '~/types';
import Logger from '../logger';
import 'source-map-support/register';

class ErrorResponse extends Response {
    constructor(
        error: Error,
        reason: ReasonPhrase,
        statusCode: StatusCode,
        request: Request,
        context: string
    ) {
        const jsonErrorBody = JSON.stringify({
            reason,
            code: statusCode,
            error: error.message
        });
        super(jsonErrorBody, { status: statusCode });
        const LOGGER = Logger.Instance.getLogger();
        const url = new URL(request.url);
        LOGGER.error(error.message, {
            context,
            requestId: url.pathname + url.search
        });
        LOGGER.error(error.stack ?? '', {
            context,
            requestId: url.pathname + url.search
        });
    }
}

class BadRequestResponse extends ErrorResponse {
    constructor(error: Error, request: Request, context: string) {
        super(error, REASON_PHRASE.BAD_REQUEST, STATUS_CODE.BAD_REQUEST, request, context);
    }
}

class ForbiddenResponse extends ErrorResponse {
    constructor(error: Error, request: Request, context: string) {
        super(error, REASON_PHRASE.FORBIDDEN, STATUS_CODE.FORBIDDEN, request, context);
    }
}

export default ErrorResponse;

export { BadRequestResponse, ForbiddenResponse };
