import { REASON_PHRASE, STATUS_CODE } from '~/constants';
import type { ReasonPhrase, StatusCode } from '~/types';

class SuccessResponse extends Response {
    constructor(reason: ReasonPhrase, statusCode: StatusCode) {
        super(reason, { status: statusCode });
    }
}

class OKResponse extends SuccessResponse {
    constructor() {
        super(REASON_PHRASE.OK, STATUS_CODE.OK);
    }
}

class createdResponse extends SuccessResponse {
    constructor() {
        super(REASON_PHRASE.CREATED, STATUS_CODE.CREATED);
    }
}

export default SuccessResponse;

export { OKResponse, createdResponse };
