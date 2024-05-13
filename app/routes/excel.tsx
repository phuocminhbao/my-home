import type { ActionFunctionArgs } from '@remix-run/node';
import MaterialTable from '~/react-components/MaterialTable';
// import { doExcel } from '~/exceljs';

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string);
    // await doExcel(data);
    return null;
};

const Excel = () => {
    return <MaterialTable />;
};

export default Excel;
