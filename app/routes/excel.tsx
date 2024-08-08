/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionFunctionArgs } from '@remix-run/node';
import MaterialTable from '~/react-components/MaterialTable';
import { OKResponse } from '~/helper/response/success';
import { doExcel } from '~/exceljs';
import { mockData1 } from '~/exceljs/mockData';
import { Form, useFetcher } from '@remix-run/react';
import { FETCHER_KEY } from '~/constants';
import type { ConstructionSettlementTable } from '~/types';
import ExcelLogger from '~/helper/logger/excel.logger';

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const LOGGER = new ExcelLogger();
    LOGGER.info('Starting');
    const data = JSON.parse(formData.get('data') as string) as ConstructionSettlementTable[];
    const constructionName = String(formData.get('constructionName'));
    // const data = mockData1 as ConstructionSettlementTable[];
    await doExcel(data, constructionName);

    LOGGER.info('Finished');

    return new OKResponse();
};

const Excel = () => {
    const { state } = useFetcher({ key: FETCHER_KEY.EXCEL });
    if (['loading', 'submitting'].includes(state)) {
        return <>Loading ...</>;
    }
    return (
        <Form method="POST" navigate={false}>
            <MaterialTable />;
        </Form>
    );
};

export default Excel;
