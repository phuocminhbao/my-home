import { Box, Button, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

const NavBarItemUnderline = () => {
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

type NavBarItem = 'about' | 'tileCategories' | 'granite' | 'project' | 'jobs';

type NavBarItemProps = {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isActive?: boolean;
};

const NavBarItem = ({ text, onClick, isActive }: NavBarItemProps) => {
    const [isHover, setIsHover] = useState(false);

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
                    onClick && onClick(e);
                }}
            >
                <Typography variant="button">{text}</Typography>
                {(isHover || isActive) && <NavBarItemUnderline />}
            </Button>
        </>
    );
};

export default NavBarItem;

export type { NavBarItem, NavBarItemProps };
