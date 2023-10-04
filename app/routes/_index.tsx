import type { MetaFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { useEffect } from 'react';
import { TableList } from '~/react-components';

export const meta: MetaFunction = () => {
    return [{ title: 'My Home' }, { name: 'description', content: 'Hallo' }];
};

export default function Index() {
    return (
        // <Form method="POST" action="/excel-action">
        //   <button type="submit">Do excel</button>
        // </Form>
        <TableList></TableList>
    );
}
