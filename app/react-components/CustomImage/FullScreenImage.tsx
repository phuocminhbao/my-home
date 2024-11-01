import { Box, Stack, Typography, Container } from '@mui/material';
import { useNavigate } from '@remix-run/react';
import useLayoutSize from '~/hooks/useLayoutSize';

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
    title?: string;
    caption?: string;
    aspectRatio?: string;
} & LinkProps;

const FullScreenImage = (props: FullScreenImageProps) => {
    const navigate = useNavigate();
    const { src, mobileImgSrc = '', isLinkImg, title, caption, alt, aspectRatio } = props;
    const linkProps = isLinkImg
        ? {
              component: 'a',
              onClick: () => {
                  if (isLinkImg) {
                      navigate(props.href);
                  }
              }
          }
        : {};
    const layout = useLayoutSize();
    const currentSize = Object.entries(layout).filter((size) => size[1] === true)[0]?.[0];
    return (
        <Container
            disableGutters
            {...linkProps}
            sx={{ aspectRatio: aspectRatio ? aspectRatio : imageRatioMap[currentSize] }}
        >
            <Box
                component="img"
                src={layout.isMobile && mobileImgSrc ? mobileImgSrc : src}
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
                    marginBottom="1rem"
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
    );
};

export default FullScreenImage;
