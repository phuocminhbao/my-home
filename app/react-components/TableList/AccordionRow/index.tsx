import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { useState } from 'react';

interface AccordionRowProps {
    children: React.ReactNode;
    expandComponent: React.ReactNode;
}

export default function AccordionRow({ children, expandComponent }: AccordionRowProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell padding="checkbox">
                    <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                {children}
            </TableRow>
            {isExpanded && expandComponent}
        </>
    );
}
