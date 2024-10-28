import { Container, Paper } from '@mui/material';
import { themeOptions } from '~/config/mui.config';
import usePageSettingContext from '~/hook/usePageSettingContext';
import TopBar from '~/react-components/Header/TopBar';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    const [{ theme }] = usePageSettingContext();
    const backgroundColor = themeOptions[theme].palette?.background?.default;
    return (
        <>
            <TopBar />
            <Container maxWidth="lg" sx={{ backgroundColor: backgroundColor }}>
                <Paper square elevation={0}>
                    {children}
                    <div>Footer</div>
                </Paper>
            </Container>
        </>
    );
};

export default GeneralLayout;
