import type { REASON_PHRASE, STATUS_CODE } from '~/constants';

type StatusCode = (typeof STATUS_CODE)[keyof typeof STATUS_CODE];

type ReasonPhrase = (typeof REASON_PHRASE)[keyof typeof REASON_PHRASE];

export type { StatusCode, ReasonPhrase };
