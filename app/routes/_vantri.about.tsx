import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'Hoa cương Văn Trị' }, { name: 'description', content: 'Hallo' }];
};

export default function Index() {
    return <>About</>;
}
