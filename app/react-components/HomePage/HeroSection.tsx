import { Box, Skeleton } from '@mui/material';
import FullScreenImage from '../CustomImage/FullScreenImage';
import { useRecoilValue } from 'recoil';
import { isGlobalLoadingAtom } from '~/recoil/atoms/isGlobalLoadingAtom';

const HeroSection = () => {
    const isLoading = useRecoilValue(isGlobalLoadingAtom);

    if (isLoading) {
        return <Skeleton variant="rectangular" width="100%" height="30rem" />;
    }

    return (
        <Box position="relative" paddingTop={4}>
            <FullScreenImage
                src="https://placehold.co/2880x1400"
                mobileImgSrc="https://placehold.co/747x747"
                isLinkImg
                href="/about"
                title="Title of hero page"
                caption="Caption of hero page, which we want customers to be impresive first"
            />
        </Box>
    );
};

export default HeroSection;
