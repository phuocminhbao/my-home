import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'Hoa cương Văn Trị' }, { name: 'description', content: 'Hallo' }];
};

export default function Index() {
    return (
        <>
            <div>Hero Section</div>
            <div>Featured Product Categories</div>
            <div>Featured Products Section</div>
            <div>Promotional Banner</div>
            <div>Why Choose Us Section</div>
            <div>Testimonials Section</div>
            <div>Blog Highlights</div>
            <div>Call to Action</div>
        </>
    );
}
