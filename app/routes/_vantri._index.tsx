import { Box, Card, CardMedia, Paper } from '@mui/material';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'Hoa cương Văn Trị' }, { name: 'description', content: 'Hallo' }];
};

export default function Index() {
    return (
        <>
            <Box position="relative" height="75%" width="100%">
                <Paper variant="elevation">
                    <Card raised>
                        <CardMedia
                            component="img"
                            alt="Hero picture"
                            image="kitcken.jpg"
                            height="500"
                        />
                    </Card>
                </Paper>
            </Box>
            <div>Hero Section</div>
            <div>Featured Product Categories</div>
            <div>Featured Products Section</div>
            <div>Promotional Banner</div>
            <div>Why Choose Us Section</div>
            <div>Testimonials Section</div>
            <div>Blog Highlights</div>
            <div>Call to Action</div>
            <div>Hero Section</div>
            <div>Featured Product Categories</div>
            <div>Featured Products Section</div>
            <div>Promotional Banner</div>
            <div>Why Choose Us Section</div>
            <div>Testimonials Section</div>
            <div>Blog Highlights</div>
            <div>Call to Action</div>
            <div>Hero Section</div>
            <div>Featured Product Categories</div>
            <div>Featured Products Section</div>
            <div>Promotional Banner</div>
            <div>Why Choose Us Section</div>
            <div>Testimonials Section</div>
            <div>Blog Highlights</div>
            <div>Call to Action</div>
            <div>Hero Section</div>
            <div>Featured Product Categories</div>
            <div>Featured Products Section</div>
            <div>Promotional Banner</div>
            <div>Why Choose Us Section</div>
            <div>Testimonials Section</div>
            <div>Blog Highlights</div>
            <div>Call to Action</div>
            <div>Hero Section</div>
            <div>Featured Product Categories</div>
            <div>Featured Products Section</div>
            <div>Promotional Banner</div>
            <div>Why Choose Us Section</div>
            <div>Testimonials Section</div>
            <div>Blog Highlights</div>
            <div>Call to Action</div>
            <div>Hero Section</div>
            <div>Featured Product Categories</div>
            <div>Featured Products Section</div>
            <div>Promotional Banner</div>
            <div>Why Choose Us Section</div>
            <div>Testimonials Section</div>
            <div>Blog Highlights</div>
            <div>Call to Action</div>
            <div>Hero Section</div>
            <div>Featured Product Categories</div>
            <div>Featured Products Section</div>
            <div>Promotional Banner</div>
            <div>Why Choose Us Section</div>
            <div>Testimonials Section</div>
            <div>Blog Highlights</div>
            <div>Call to Action</div>
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
