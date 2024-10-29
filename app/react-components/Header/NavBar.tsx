import type { PopoverPosition } from '@mui/material';
import {
    AppBar,
    Backdrop,
    Box,
    Button,
    Divider,
    Fade,
    Menu,
    MenuItem,
    MenuList,
    Stack,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import useLayoutSize from '~/hook/useLayoutSize';
import useTranslation from '~/hook/useTranslation';

const Underline = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: '24px',
                height: '3px',
                backgroundColor: theme.palette.primary.main,
                position: 'absolute',
                transition: '2000ms',
                bottom: '-4px'
            }}
        />
    );
};

const NavBarItem = ({
    text,
    onClick,
    isDropdown,
    activeItem
}: {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isDropdown?: boolean;
    activeItem?: string;
}) => {
    const [isHover, setIsHover] = useState(false);
    // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState<PopoverPosition>();
    const closeMenu = () => {
        setIsOpenMenu(false);
    };
    useEffect(() => {
        if (isDropdown && text !== activeItem) {
            setIsHover(false);
            closeMenu();
        }
    }, [activeItem]);

    return (
        <>
            <Button
                variant="text"
                onPointerEnter={() => {
                    setIsHover(true);
                }}
                onPointerLeave={() => {
                    setIsHover(false);
                }}
                onClick={(e) => {
                    const target = e.currentTarget;
                    onClick && onClick(e);
                    if (isDropdown) {
                        setIsOpenMenu((pre) => !pre);
                        setMenuPosition({
                            top:
                                (document.getElementById('topbar')?.offsetHeight ?? 0) +
                                ((target?.offsetParent as HTMLElement)?.offsetHeight ?? 0) +
                                2,
                            left: (target?.offsetLeft ?? 0) + (target?.offsetWidth ?? 0) / 2
                        });
                    }
                }}
            >
                <Typography variant="button">{text}</Typography>
                {(isHover || isOpenMenu) && <Underline />}
            </Button>
            {isDropdown && (
                <Menu
                    open={isOpenMenu}
                    onClose={closeMenu}
                    anchorReference="anchorPosition"
                    anchorPosition={menuPosition}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    elevation={2}
                    slotProps={{
                        root: {
                            slots: { backdrop: Backdrop },
                            slotProps: {
                                backdrop: {
                                    sx: { top: menuPosition?.top },
                                    transitionDuration: 500,
                                    TransitionComponent: Fade
                                }
                            }
                        }
                    }}
                    sx={[
                        (theme) => ({
                            zIndex: theme.zIndex.appBar - 1
                        })
                    ]}
                >
                    <Box>
                        <MenuList>
                            <Divider />
                            <MenuItem onClick={closeMenu}>
                                <Typography variant="overline">Đá đỏ</Typography>{' '}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={closeMenu}>
                                <Typography variant="overline">Đá trắng</Typography>{' '}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={closeMenu}>
                                <Typography variant="overline">Đá đen</Typography>{' '}
                            </MenuItem>
                            <Divider />
                        </MenuList>
                    </Box>
                </Menu>
            )}
        </>
    );
};

const NavBar = () => {
    const { translate } = useTranslation();
    const { isMobile } = useLayoutSize();
    const [activeItem, setActiveItem] = useState('');
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
                        <NavBarItem
                            text={translate('nav_bar_granite')}
                            isDropdown
                            activeItem={activeItem}
                            onClick={() => {
                                setActiveItem(translate('nav_bar_granite'));
                            }}
                        />
                        <NavBarItem
                            text={translate('nav_bar_project')}
                            isDropdown
                            activeItem={activeItem}
                            onClick={() => {
                                setActiveItem(translate('nav_bar_project'));
                            }}
                        />
                        <NavBarItem text={translate('nav_bar_job')} />
                    </Stack>
                </Toolbar>
            </AppBar>
        )
    );
};

export default NavBar;
