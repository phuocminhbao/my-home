import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { EXCEL_PATH } from '~/constants';

export const meta: MetaFunction = () => {
    return [{ title: 'My Home' }, { name: 'description', content: 'Hallo' }];
};

export default function Index() {
    return <Link to={EXCEL_PATH}>To Excel</Link>;
}
