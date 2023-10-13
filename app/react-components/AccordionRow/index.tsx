import { KeyboardArrowUp, KeyboardArrowDown, PlaylistAdd } from '@mui/icons-material';
import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';
import { colWidth } from '~/contants';

interface AccordionRowProps {
    children: React.ReactNode;
    expandComponent: React.ReactNode;
    rowId: number;
    addSubRowsCallback: (id: number) => void;
}

export default function AccordionRow({
    children,
    expandComponent,
    rowId,
    addSubRowsCallback
}: AccordionRowProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isHavingDetailsRow = _.get(expandComponent, 'props.children', []).length > 0;

    return (
        <>
            <TableRow draggable>
                <TableCell padding="checkbox" width={colWidth.event}>
                    {isHavingDetailsRow ? (
                        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                    ) : (
                        <Tooltip title="Thêm hàng con">
                            <IconButton
                                onClick={() => {
                                    addSubRowsCallback(rowId);
                                    setIsExpanded(true);
                                }}
                            >
                                <PlaylistAdd />
                            </IconButton>
                        </Tooltip>
                    )}
                </TableCell>
                {children}
            </TableRow>
            {isExpanded && expandComponent}
        </>
    );
}
