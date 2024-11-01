import type { SvgIconComponent } from '@mui/icons-material';
import { HelpOutline, LocationOnOutlined, MenuTwoTone, Phone } from '@mui/icons-material';
import {
    Drawer,
    List,
    Divider,
    Breadcrumbs,
    Stack,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material';
import { useState } from 'react';
import LanguageChange from './LanguageChange';
import ThemeChange from './ThemeChange';
import useTranslation from '~/hooks/useTranslation';

const BreadcrumbMenuIcon = ({
    Icon,
    onClick,
    tooltipTitle,
    children
}: {
    Icon: SvgIconComponent;
    tooltipTitle: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
}) => {
    return (
        <Stack direction="row">
            <Tooltip title={tooltipTitle}>
                <IconButton onClick={onClick}>
                    <Icon color="primary" fontSize="medium" />
                </IconButton>
            </Tooltip>
            <Typography variant="body2" alignContent="center">
                {children}
            </Typography>
        </Stack>
    );
};
const BreadcrumbsMenu = () => {
    const { translate } = useTranslation();

    return (
        <Stack direction="row">
            <Breadcrumbs>
                <BreadcrumbMenuIcon Icon={Phone} tooltipTitle="">
                    0903605306/0907050502
                </BreadcrumbMenuIcon>
                <BreadcrumbMenuIcon
                    Icon={LocationOnOutlined}
                    tooltipTitle={translate('top_bar_find_us')}
                />
                <BreadcrumbMenuIcon Icon={HelpOutline} tooltipTitle={translate('top_bar_help')} />
                <LanguageChange />
            </Breadcrumbs>
            <ThemeChange />
        </Stack>
    );
};

const DrawMenuIconText = ({
    Icon,
    onClick,
    text
}: {
    Icon: SvgIconComponent;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    text: string;
}) => {
    return (
        <ListItem>
            <ListItemButton onClick={onClick}>
                <ListItemIcon>
                    <Icon color="primary" />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
};

const DrawerMenu = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const { translate } = useTranslation();
    return (
        <>
            <IconButton
                onClick={() => {
                    setIsOpenDrawer(true);
                }}
            >
                <MenuTwoTone color="primary" />
            </IconButton>
            <Drawer
                open={isOpenDrawer}
                onClose={() => {
                    setIsOpenDrawer(false);
                }}
                anchor="top"
            >
                <List></List>
                <Divider />
                <List>
                    <DrawMenuIconText
                        Icon={LocationOnOutlined}
                        text={translate('top_bar_find_us')}
                    />
                    <DrawMenuIconText Icon={HelpOutline} text={translate('top_bar_help')} />
                    <LanguageChange />
                    <ThemeChange />
                </List>
            </Drawer>
        </>
    );
};

export { BreadcrumbsMenu, DrawerMenu };
