import { AppBar, Backdrop, Fade, Popper, Stack, Toolbar } from '@mui/material';
import { useRef, useState } from 'react';
import useLayoutSize from '~/hooks/useLayoutSize';
import useTranslation from '~/hooks/useTranslation';
import NavBarItem from './NavBarItem';
import type { NavBarItemProps } from './NavBarItem';
import NavbarDropDown from './NavbarDropDown';

const NavBar = () => {
    const { translate } = useTranslation();
    const {
        breakPoints: { desktopLarge }
    } = useLayoutSize();
    const [activeItem, setActiveItem] = useState<NavBarItem | undefined>();
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const ref = useRef<HTMLElement>(null);
    const openDropdown = () => {
        setIsOpenDropdown(true);
    };
    const closeDropdown = () => {
        setIsOpenDropdown(false);
        setActiveItem(undefined);
    };

    const openOrCloseDropdown = (target: NavBarItem) => {
        if (activeItem === target && isOpenDropdown) {
            closeDropdown();
            return;
        }
        openDropdown();
    };

    const navBarItemProps: Record<NavBarItem, NavBarItemProps> = {
        about: {
            text: translate('nav_bar_about')
        },
        tileCategories: {
            text: translate('nav_bar_tile_categories'),
            isActive: activeItem === 'tileCategories',
            onClick: () => {
                setActiveItem('tileCategories');
                openOrCloseDropdown('tileCategories');
            }
        },
        granite: {
            text: translate('nav_bar_granite'),
            isActive: activeItem === 'granite',
            onClick: () => {
                setActiveItem('granite');
                openOrCloseDropdown('granite');
            }
        },
        project: {
            text: translate('nav_bar_project'),
            isActive: activeItem === 'project',
            onClick: () => {
                setActiveItem('project');
                openOrCloseDropdown('project');
            }
        },
        jobs: {
            text: translate('nav_bar_job'),
            isActive: activeItem === 'jobs'
        }
    };

    return (
        <>
            <AppBar
                position="sticky"
                variant="outlined"
                elevation={0}
                component="nav"
                enableColorOnDark={true}
                sx={[
                    (theme) => ({
                        backgroundColor: theme.palette.background.default,
                        [theme.breakpoints.down('tablet')]: {
                            display: 'none'
                        }
                    })
                ]}
                ref={ref}
            >
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Stack direction="column" width="100%" maxWidth={desktopLarge}>
                        <Stack direction="row" justifyContent="space-evenly" width="100%">
                            {Object.entries(navBarItemProps).map((item) => {
                                const [key, props] = item;
                                return <NavBarItem key={key} {...props} />;
                            })}
                        </Stack>
                        <Popper
                            open={isOpenDropdown}
                            anchorEl={ref.current}
                            placement="bottom"
                            sx={[
                                (theme) => ({
                                    width: '100%',
                                    zIndex: theme.zIndex.appBar
                                })
                            ]}
                        >
                            <NavbarDropDown close={closeDropdown} />
                        </Popper>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Backdrop
                open={isOpenDropdown}
                onClick={closeDropdown}
                TransitionComponent={Fade}
                transitionDuration={300}
                sx={[(theme) => ({ zIndex: theme.zIndex.appBar - 1 })]}
            ></Backdrop>
        </>
    );
};

export default NavBar;
