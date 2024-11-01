import { Container, useTheme } from '@mui/material';
import Footer from '~/react-components/Footer/Footer';
import NavBar from '~/react-components/Header/NavBar/NavBar';
import TopBar from '~/react-components/Header/TopBar/TopBar';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    const { palette } = useTheme();
    const backgroundColor = palette?.background?.default;
    return (
        <>
            <TopBar />
            <NavBar />
            <Container
                disableGutters
                maxWidth={false}
                sx={{
                    backgroundColor: backgroundColor,
                    margin: 0,
                    width: '100%'
                }}
                component="main"
            >
                <Container maxWidth={'desktopLarge'} disableGutters>
                    {children}
                </Container>
            </Container>
            <Footer />
        </>
    );
};

export default GeneralLayout;
