import FullScreenImage from '../CustomImage/FullScreenImage';
import Carousel from '../Carousel/Carousel';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Skeleton,
    Typography
} from '@mui/material';
import useLayoutSize from '~/hooks/useLayoutSize';
import { useRecoilValue } from 'recoil';
import { isGlobalLoadingAtom } from '~/recoil/atoms/isGlobalLoadingAtom';
import SectionContainer from '../SectionContainer/SectionContainer';

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
        <Card variant="outlined" sx={{ border: 'none' }}>
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
            <CardContent sx={{ padding: 0 }}>
                <SectionContainer disablePaddingTopBot>
                    <Typography
                        variant="h2"
                        justifyContent="center"
                        display="flex"
                        paddingBottom={1}
                    >
                        Slide header
                    </Typography>
                    <Typography variant="body2" justifyContent="center" display="flex">
                        Lorem Ipsum is simply dummy text of the printing
                    </Typography>
                </SectionContainer>
            </CardContent>
            <CardActions>
                <Box width="100%" justifyContent="center" display="flex">
                    <Button variant="contained" sx={{ textTransform: 'none' }}>
                        <Typography variant="body2">Action</Typography>
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default SlideShowSection;
