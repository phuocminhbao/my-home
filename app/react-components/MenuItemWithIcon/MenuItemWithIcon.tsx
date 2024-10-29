import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import type { MouseEventHandler } from 'react';

const MenuItemWithIcon = ({
    handleClick,
    icon,
    text
}: {
    handleClick: MouseEventHandler<HTMLLIElement>;
    icon?: JSX.Element;
    text?: string;
}) => {
    return (
        <MenuItem onClick={handleClick}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            {text && <ListItemText>{text}</ListItemText>}
        </MenuItem>
    );
};

export default MenuItemWithIcon;
