import { Stack } from '@mui/material';
import HeroSection from './HeroSection';
import SlideShowSection from './SlideShowSection';
import TilecategoriesSection from './TilecategoriesSection';

const HomePage = () => {
    return (
        <Stack direction="column" spacing={5} position={'relative'}>
            <HeroSection />
            <SlideShowSection />
            <TilecategoriesSection />
            <div>Hero Section 1111111111</div>
            <div>Featured Product Categories</div>
            <div>Featured Products Section</div>
            <div>Promotional Banner</div>
            <div>Why Choose Us Section</div>
            <div>Testimonials Section</div>
            <div>Blog Highlights</div>
            <div>Call to Action</div>
        </Stack>
    );
};

export default HomePage;
