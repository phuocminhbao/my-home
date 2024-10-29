import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import useLayoutSize from '~/hook/useLayoutSize';
import useTranslation from '~/hook/useTranslation';

const Underline = () => {
    return (
        <Box
            sx={{
                width: '24px',
                height: '3px',
                backgroundColor: '#000000',
                position: 'absolute',
                transition: '2000ms',
                bottom: '-4px'
            }}
        />
    );
};

const NavBarItem = ({
    text,
    onClick
}: {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
    const [isHover, setIsHover] = useState(false);
    return (
        <Button
            variant="text"
            onPointerEnter={() => {
                setIsHover(true);
            }}
            onPointerLeave={() => {
                setIsHover(false);
            }}
            onClick={onClick}
        >
            <Typography variant="button">{text}</Typography>
            {isHover && <Underline />}
        </Button>
    );
};

const NavBar = () => {
    const { translate } = useTranslation();
    const { isMobile } = useLayoutSize();
    return (
        !isMobile && (
            <AppBar
                position="sticky"
                variant="outlined"
                elevation={0}
                component="nav"
                enableColorOnDark={true}
                sx={[(theme) => ({ backgroundColor: theme.palette.background.default })]}
            >
                <Toolbar>
                    <Stack direction="row" justifyContent="space-evenly" width="100%">
                        <NavBarItem text={translate('nav_bar_about')} />
                        <NavBarItem text={translate('nav_bar_tile_categories')} />
                        <NavBarItem text={translate('nav_bar_granite')} />
                        <NavBarItem text={translate('nav_bar_project')} />
                        <NavBarItem text={translate('nav_bar_job')} />
                    </Stack>
                </Toolbar>
            </AppBar>
        )
    );
};

export default NavBar;
