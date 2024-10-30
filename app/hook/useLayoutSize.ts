import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const useLayoutSize = () => {
    const { breakpoints } = useTheme();
    const [sizeInfo, setSizeInfo] = useState({
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: false,
        isDesktopLarge: false,
        breakPoints: breakpoints.values
    });
    const isMobile = useMediaQuery(breakpoints.up('mobile'));
    const isTablet = useMediaQuery(breakpoints.up('tablet'));
    const isLaptop = useMediaQuery(breakpoints.up('laptop'));
    const isDesktop = useMediaQuery(breakpoints.up('desktop'));
    const isDesktopLarge = useMediaQuery(breakpoints.up('desktopLarge'));

    useEffect(() => {
        setSizeInfo({
            isMobile: isMobile && !isTablet,
            isTablet: isTablet && !isLaptop,
            isLaptop: isLaptop && !isDesktop,
            isDesktop: isDesktop && !isDesktopLarge,
            isDesktopLarge,
            breakPoints: breakpoints.values
        });
    }, [breakpoints.values, isDesktop, isDesktopLarge, isLaptop, isMobile, isTablet]);
    return sizeInfo;
};

export default useLayoutSize;
