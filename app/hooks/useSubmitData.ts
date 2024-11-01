import { useSubmit } from '@remix-run/react';
import type { FETCHER_KEY } from '~/constants';

const useSubmitData = () => {
    const submit = useSubmit();

    const submitData = (data: string | FormData, actionPath: string, fetcherKey: FETCHER_KEY) => {
        const sendData = typeof data === 'string' ? { data } : data;
        submit(sendData, { method: 'POST', action: actionPath, navigate: false, fetcherKey });
    };

    return {
        submitData
    };
};

export default useSubmitData;
