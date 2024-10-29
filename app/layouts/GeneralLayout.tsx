import { Box, Container, Paper, Stack } from '@mui/material';
import { themeOptions } from '~/config/mui.config';
import usePageSettingContext from '~/hook/usePageSettingContext';
import NavBar from '~/react-components/Header/NavBar';
import TopBar from '~/react-components/Header/TopBar';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    const [{ theme }] = usePageSettingContext();
    const backgroundColor = themeOptions[theme].palette?.background?.default;
    return (
        <Box position="relative">
            <Stack direction={'column'} height={'100%'} width="100%" position="absolute">
                <TopBar />
                <NavBar />
            </Stack>
            <Container maxWidth="lg" sx={{ backgroundColor: backgroundColor }}>
                <Paper square elevation={0}>
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    {children}
                    <div>Footer</div>
                </Paper>
            </Container>
        </Box>
    );
};

export default GeneralLayout;
