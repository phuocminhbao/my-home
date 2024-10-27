import type { MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import GeneralLayout from '~/layouts/GeneralLayout';

export const meta: MetaFunction = () => {
    return [{ title: 'Hoa cương Văn Trị' }, { name: 'description', content: 'Hallo' }];
};

export default function Index() {
    return (
        <>
            <GeneralLayout>
                <Outlet />
            </GeneralLayout>
        </>
    );
}
