import { Box, Container, Stack, Typography } from '@mui/material';
import useLayoutSize from '~/hook/useLayoutSize';

const imageRatioMap: Record<string, string> = {
    isMobile: '1',
    isTablet: '4/3',
    isLaptop: '16/9',
    isDesktop: '16/9',
    isDesktopLarge: '16/9'
};

const HeroSection = () => {
    const layout = useLayoutSize();
    const currentSize = Object.entries(layout).filter((l) => l[1] === true)[0]?.[0];
    return (
        <Box position="relative" marginLeft="-3rem" marginRight="-3rem">
            <Container
                disableGutters
                component="a"
                href="/about"
                maxWidth="desktopLarge"
                sx={{ aspectRatio: imageRatioMap[currentSize] }}
            >
                <Box
                    component="img"
                    src={
                        layout.isMobile
                            ? 'https://placehold.co/747x747'
                            : 'https://placehold.co/2880x1400'
                    }
                    alt="hero-img"
                    sx={{
                        objectFit: 'cover',
                        minHeight: '100%',
                        maxHeight: '100%',
                        minWidth: '100%',
                        maxWidth: '100%'
                    }}
                ></Box>
                <Stack
                    direction="column"
                    position={'absolute'}
                    width="100%"
                    spacing={2}
                    bottom={0}
                    alignItems="center"
                    marginBottom="3rem"
                >
                    <Typography variant="h2" color="primary">
                        Title of hero page
                    </Typography>
                    <Typography variant="caption" color="primary">
                        Caption of hero page, which we want customers to be impresive first
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default HeroSection;
