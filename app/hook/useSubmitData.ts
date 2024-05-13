import { useSubmit } from '@remix-run/react';

const useSubmitData = () => {
    const submit = useSubmit();

    const submitData = (data: string, actionPath: string) => {
        submit({ data }, { method: 'POST', action: actionPath, navigate: false });
    };

    return {
        submitData
    };
};

export default useSubmitData;
