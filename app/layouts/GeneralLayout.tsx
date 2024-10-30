import { Container, Paper } from '@mui/material';
import { themeOptions } from '~/config/mui.config';
import usePageSettingContext from '~/hook/usePageSettingContext';
import NavBar from '~/react-components/Header/NavBar/NavBar';
import TopBar from '~/react-components/Header/TopBar/TopBar';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    const [{ theme }] = usePageSettingContext();
    const backgroundColor = themeOptions[theme].palette?.background?.default;
    return (
        <>
            <TopBar />
            <NavBar />
            <Container
                disableGutters
                maxWidth={false}
                sx={{
                    backgroundColor: backgroundColor,
                    padding: '2rem',
                    margin: 0,
                    width: '100%'
                }}
                component="main"
            >
                <Paper square elevation={1}>
                    {children}
                </Paper>
            </Container>
            <div>Footer</div>
        </>
    );
};

export default GeneralLayout;
