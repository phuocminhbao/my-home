import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { ROUTE_PATH } from '~/constants';

export const meta: MetaFunction = () => {
    return [{ title: 'My Home' }, { name: 'description', content: 'Hallo' }];
};

export default function Index() {
    return <Link to={ROUTE_PATH.EXCEL}>To Excel</Link>;
}
