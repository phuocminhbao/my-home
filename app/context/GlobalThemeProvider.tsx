import { ThemeProvider } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { createCustomTheme } from '~/config/mui.config';
import { globalThemeAtom } from '~/recoil/atoms/globalThemeAtom';
const GlobalThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const theme = useRecoilValue(globalThemeAtom);
    return <ThemeProvider theme={createCustomTheme(theme)}>{children}</ThemeProvider>;
};

export default GlobalThemeProvider;
