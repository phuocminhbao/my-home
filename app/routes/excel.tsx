import type { ActionFunctionArgs } from '@remix-run/node';
import type { ConstructionSettlementTable } from '~/types';
import MaterialTable from '~/react-components/MaterialTable';
import { OKResponse } from '~/helper/response/success';
import { doExcel } from '~/exceljs';
import { BadRequestResponse } from '~/helper/response/error';

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    try {
        const data = JSON.parse(formData.get('data') as string) as ConstructionSettlementTable[];
        await doExcel(data);
    } catch (e) {
        return new BadRequestResponse((e as Error).message);
    }

    return new OKResponse();
};

const Excel = () => {
    return <MaterialTable />;
};

export default Excel;
