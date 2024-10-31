import { Box, Stack, Typography, Container } from '@mui/material';
import useLayoutSize from '~/hook/useLayoutSize';

const imageRatioMap: Record<string, string> = {
    isMobile: '1',
    isTablet: '4/3',
    isLaptop: '16/9',
    isDesktop: '16/9',
    isDesktopLarge: '16/9'
};

type LinkProps = { isLinkImg: false } | { isLinkImg: true; href: string };

type FullScreenImageProps = {
    src: string;
    mobileImgSrc?: string;
    alt?: string;
    isFullScreen?: boolean;
    title?: string;
    caption?: string;
} & LinkProps;

const FullScreenImage = (props: FullScreenImageProps) => {
    const { src, mobileImgSrc = '', isFullScreen, isLinkImg, title, caption, alt } = props;
    const linkProps = isLinkImg
        ? {
              component: 'a',
              href: props.href
          }
        : {};
    const layout = useLayoutSize();
    const currentSize = Object.entries(layout).filter((size) => size[1] === true)[0]?.[0];
    return (
        <Box
            position="relative"
            left="50%"
            width="100vw"
            maxWidth={isFullScreen ? undefined : 'desktopLarge'}
            sx={{ transform: 'translateX(-50%)' }}
        >
            <Container
                disableGutters
                {...linkProps}
                maxWidth={isFullScreen ? undefined : 'desktopLarge'}
                sx={{ aspectRatio: imageRatioMap[currentSize] }}
            >
                <Box
                    component="img"
                    src={layout.isMobile ? mobileImgSrc : src}
                    alt={alt}
                    sx={{
                        objectFit: 'cover',
                        minHeight: '100%',
                        maxHeight: '100%',
                        minWidth: '100%',
                        maxWidth: '100%'
                    }}
                ></Box>
                {(title || caption) && (
                    <Stack
                        direction="column"
                        position="absolute"
                        width="100%"
                        spacing={2}
                        bottom={0}
                        alignItems="center"
                        marginBottom="3rem"
                    >
                        <Typography variant="h2" color="primary">
                            {title}
                        </Typography>
                        <Typography variant="caption" color="primary">
                            {caption}
                        </Typography>
                    </Stack>
                )}
            </Container>
        </Box>
    );
};

export default FullScreenImage;
