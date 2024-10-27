import { Menu, Button, Typography } from '@mui/material';
import { useState } from 'react';
import usePageSettingContext from '~/hook/usePageSettingContext';
import useTranslation from '~/hook/useTranslation';
import VNFlag from './CountryFlagIcon/VNFlag';
import USFlag from './CountryFlagIcon/USFlag';
import MenuItemWithIcon from '../MenuItemWithIcon/MenuItemWithIcon';

const LanguageChange = () => {
    const { translate } = useTranslation();
    const [pageSetting, setPageSetting] = usePageSettingContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { language } = pageSetting;
    const countryIcon = language === 'vietnamese' ? <VNFlag /> : <USFlag />;
    return (
        <>
            <Button
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={countryIcon}
                color="primary"
                sx={{ backgroundColor: 'inherit' }}
            >
                <Typography variant="button">
                    {translate(language === 'vietnamese' ? 'vn_lang' : 'en_lang')}
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
                    handleClick={() => {
                        if (language === 'vietnamese') return;
                        setPageSetting((preSetting) => ({
                            ...preSetting,
                            language: 'vietnamese'
                        }));
                        handleClose();
                    }}
                    icon={<VNFlag />}
                    text={translate('vn_lang')}
                />
                <MenuItemWithIcon
                    handleClick={() => {
                        if (language === 'english') return;
                        setPageSetting((preSetting) => ({
                            ...preSetting,
                            language: 'english'
                        }));
                        handleClose();
                    }}
                    icon={<USFlag />}
                    text={translate('en_lang')}
                />
            </Menu>
        </>
    );
};

export default LanguageChange;
