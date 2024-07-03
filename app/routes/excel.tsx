import type { ActionFunctionArgs } from '@remix-run/node';
// import type { ConstructionSettlementTable } from '~/types';
import MaterialTable from '~/react-components/MaterialTable';
import { OKResponse } from '~/helper/response/success';
import { doExcel } from '~/exceljs';
import { BadRequestResponse } from '~/helper/response/error';
import { mockData1 } from '~/exceljs/mockData';
import Logger from '~/helper/logger';
import { useFetcher } from '@remix-run/react';

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const LOGGER = Logger.Instance.getLogger();
    const url = new URL(request.url);
    const actionContext = 'Proccess Excel';
    const logInfo = {
        context: actionContext,
        requestId: url.pathname + url.search
    };
    LOGGER.info('Starting proccess excel', logInfo);
    try {
        // const data = JSON.parse(formData.get('data') as string) as ConstructionSettlementTable[];
        const data = mockData1;
        await doExcel(data);
    } catch (e) {
        return new BadRequestResponse((e as Error).message, request, actionContext);
    }

    LOGGER.info('Finished proccess excel', logInfo);

    return new OKResponse();
};

const Excel = () => {
    const fetcherData = useFetcher({ key: FETCHER_KEY.EXCEL });
    if (fetcherData.state === 'loading' || fetcherData.state === 'submitting') {
        return <>Loading ...</>;
    }
    return <MaterialTable />;
};

export default Excel;
