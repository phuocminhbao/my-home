import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const useLayoutSize = () => {
    const theme = useTheme();
    const [sizeInfo, setSizeInfo] = useState({
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: false
    });
    const isMobile = useMediaQuery(theme.breakpoints.up('xs'));
    const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
    const isLaptop = useMediaQuery(theme.breakpoints.up('md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    useEffect(() => {
        setSizeInfo({
            isMobile: isMobile && !isTablet,
            isTablet: isTablet && !isLaptop,
            isLaptop: isLaptop && !isDesktop,
            isDesktop: isDesktop
        });
    }, [isDesktop, isLaptop, isMobile, isTablet]);
    return sizeInfo;
};

export default useLayoutSize;
