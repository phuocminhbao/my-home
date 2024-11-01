import FullScreenImage from '../CustomImage/FullScreenImage';
import Carousel from '../Carousel/Carousel';
import { Card, CardActions, CardContent, CardMedia, Skeleton } from '@mui/material';
import useLayoutSize from '~/hooks/useLayoutSize';
import { useRecoilValue } from 'recoil';
import { isGlobalLoadingAtom } from '~/recoil/atoms/isGlobalLoadingAtom';

const SlideShowSection = () => {
    const { isMobile, isTablet } = useLayoutSize();
    const isLoading = useRecoilValue(isGlobalLoadingAtom);
    const getCarouselHeight = () => {
        if (isMobile) {
            return '250px';
        }
        if (isTablet) {
            return '300px';
        }
        return '450px';
    };
    if (isLoading) {
        return <Skeleton variant="rectangular" width="100%" height="20rem" />;
    }
    return (
        <Card>
            <CardMedia>
                <Carousel
                    animation="slide"
                    height={getCarouselHeight()}
                    showCustomNavigation
                    autoPlay
                >
                    <FullScreenImage
                        src="https://placehold.co/2880x1400"
                        mobileImgSrc="https://placehold.co/747x747"
                        isLinkImg
                        href="/"
                    />
                    <FullScreenImage
                        src="https://placehold.co/2881x1400"
                        mobileImgSrc="https://placehold.co/747x747"
                        isLinkImg
                        href="/"
                    />
                    <FullScreenImage
                        src="https://placehold.co/2882x1400"
                        mobileImgSrc="https://placehold.co/747x747"
                        isLinkImg
                        href="/"
                    />
                    <FullScreenImage
                        src="https://placehold.co/2883x1400"
                        mobileImgSrc="https://placehold.co/747x747"
                        isLinkImg
                        href="/"
                    />
                </Carousel>
            </CardMedia>
            <CardContent>Content</CardContent>
            <CardActions>Action</CardActions>
        </Card>
    );
};

export default SlideShowSection;
