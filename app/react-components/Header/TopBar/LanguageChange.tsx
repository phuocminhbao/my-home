import {
    Menu,
    Button,
    Typography,
    ListItemButton,
    Collapse,
    List,
    ListItemIcon,
    ListItemText,
    ListItem,
    ButtonGroup
} from '@mui/material';
import { useState } from 'react';
import useTranslation from '~/hook/useTranslation';
import VNFlag from '../CountryFlagIcon/VNFlag';
import USFlag from '../CountryFlagIcon/USFlag';
import useLayoutSize from '~/hook/useLayoutSize';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuItemWithIcon from '~/react-components/MenuItemWithIcon/MenuItemWithIcon';
import { useRecoilState } from 'recoil';
import { languageAtom } from '~/recoil/atoms/languageAtom';

const LanguageChange = () => {
    const { translate } = useTranslation();
    const { isMobile } = useLayoutSize();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [language, setLanguage] = useRecoilState(languageAtom);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (isMobile) {
            setIsMobileOpen(!isMobileOpen);
            return;
        }
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        if (isMobile) {
            setIsMobileOpen(false);
            return;
        }
        setAnchorEl(null);
    };
    const { isVietnamese, isEnglish } = {
        isVietnamese: language === 'vietnamese',
        isEnglish: language === 'english'
    };
    const changeToVietnamese = () => {
        if (isVietnamese) return;
        setLanguage('vietnamese');
        handleClose();
    };
    const changeToEnglish = () => {
        if (language === 'english') return;
        setLanguage('english');
        handleClose();
    };
    const countryIcon = isVietnamese ? <VNFlag /> : <USFlag />;
    return isMobile ? (
        <>
            <ListItem>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>{countryIcon}</ListItemIcon>
                    <ListItemText primary={translate('mobile_language')} />
                    {isMobileOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={isMobileOpen} timeout="auto" unmountOnExit>
                <List disablePadding>
                    <ListItem disablePadding>
                        <ButtonGroup fullWidth size="small">
                            <Button
                                variant={isVietnamese ? 'contained' : 'outlined'}
                                color={isVietnamese ? 'primary' : 'secondary'}
                            >
                                <ListItemText
                                    primary={translate('vn_lang')}
                                    onClick={changeToVietnamese}
                                />
                            </Button>
                            <Button
                                variant={isEnglish ? 'contained' : 'outlined'}
                                color={isEnglish ? 'primary' : 'secondary'}
                            >
                                <ListItemText
                                    primary={translate('en_lang')}
                                    onClick={changeToEnglish}
                                />
                            </Button>
                        </ButtonGroup>
                    </ListItem>
                </List>
            </Collapse>
        </>
    ) : (
        <>
            <Button
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={countryIcon}
                color="primary"
                size="small"
            >
                <Typography variant="button" fontSize={12}>
                    {translate(isVietnamese ? 'vn_lang' : 'en_lang')}
                </Typography>
            </Button>
            <Menu
                open={isOpen}
                onClose={handleClose}
                anchorEl={anchorEl}
                elevation={0}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItemWithIcon
                    handleClick={changeToVietnamese}
                    icon={<VNFlag />}
                    text={translate('vn_lang')}
                />
                <MenuItemWithIcon
                    handleClick={changeToEnglish}
                    icon={<USFlag />}
                    text={translate('en_lang')}
                />
            </Menu>
        </>
    );
};

export default LanguageChange;
