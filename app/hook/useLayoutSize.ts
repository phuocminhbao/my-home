import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useLayoutSize = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up('xs'));
    const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
    const isLaptop = useMediaQuery(theme.breakpoints.up('md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    return {
        isMobile: isMobile && !isTablet,
        isTablet: isTablet && !isLaptop,
        isLaptop: isLaptop && !isDesktop,
        isDesktop: isDesktop
    };
};

export default useLayoutSize;
