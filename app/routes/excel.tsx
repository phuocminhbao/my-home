import { Outlet } from '@remix-run/react';
import MaterialTable from '~/react-components/MaterialTable';

const Excel = () => {
    return (
        <>
            <MaterialTable />
            <Outlet />
        </>
    );
};

export default Excel;
