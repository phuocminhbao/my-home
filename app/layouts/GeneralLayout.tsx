import { Container, Paper } from '@mui/material';
import { themeOptions } from '~/config/mui.config';
import usePageSettingContext from '~/hook/usePageSettingContext';
import TopBar from '~/react-components/Header/TopBar';
import type { SimplePaletteColorOptions } from '@mui/material';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    const [{ theme }] = usePageSettingContext();
    const backgroundColor = themeOptions[theme].palette?.background?.default;
    return (
        <Container maxWidth="lg" sx={{ backgroundColor: backgroundColor }}>
            <Paper elevation={0} square>
                <TopBar />
                {children}
                <div>Footer</div>
            </Paper>
        </Container>
    );
};

export default GeneralLayout;
