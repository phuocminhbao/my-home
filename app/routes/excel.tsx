import type { ActionFunctionArgs } from '@remix-run/node';
// import type { ConstructionSettlementTable } from '~/types';
import MaterialTable from '~/react-components/MaterialTable';
import { OKResponse } from '~/helper/response/success';
import { doExcel } from '~/exceljs';
import { BadRequestResponse } from '~/helper/response/error';
import { mockData1 } from '~/exceljs/mockData';
import Logger from '~/helper/logger';
import { useFetcher } from '@remix-run/react';
import { FETCHER_KEY } from '~/constants';
import { ConstructionSettlementTable } from '~/types';
import ExcelLogger from '~/helper/logger/excel.logger';

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const LOGGER = new ExcelLogger();
    const url = new URL(request.url);
    LOGGER.info('Starting');
    try {
        // const data = JSON.parse(formData.get('data') as string) as ConstructionSettlementTable[];
        const data = mockData1 as ConstructionSettlementTable[];
        await doExcel(data);
    } catch (e) {
        return new BadRequestResponse(e as Error, request, LOGGER.getActionContext());
    }

    LOGGER.info('Finished');

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
