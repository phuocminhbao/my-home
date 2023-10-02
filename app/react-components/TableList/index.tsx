import { TableRow, TableCell, IconButton, Paper, Table, TableHead, TableBody } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useState } from 'react';
import { columnType, getDefaultData } from '~/utils/dataUtil';
import {
    ConstructionSettlement,
    ConstructionSettlementTable
} from '~/types/ExcelModel/ConstructionSettlement';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    detail: string
) {
    return { name, calories, fat, carbs, protein, detail };
}

const rows = [
    createData(
        'Frozen yoghurt',
        159,
        6.0,
        24,
        4.0,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    ),
    createData(
        'Ice cream sandwich',
        237,
        9.0,
        37,
        4.3,
        'Maecenas rutrum urna vel lacus viverra, id ultrices dui rutrum'
    ),
    createData(
        'Eclair',
        262,
        16.0,
        24,
        6.0,
        'Morbi congue gravida nunc, eu cursus felis vulputate id'
    ),
    createData(
        'Cupcake',
        305,
        3.7,
        67,
        4.3,
        'Vestibulum efficitur, ipsum consectetur finibus maximus, ligula dolor vehicula ex, sed viverra nulla mauris id purus'
    ),
    createData('Gingerbread', 356, 16.0, 49, 3.9, ' Suspendisse vehicula eu libero eget viverra')
];

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <TableRow {...otherProps}>
                <TableCell padding="checkbox">
                    <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                {children}
            </TableRow>
            {isExpanded && (
                <TableRow>
                    <TableCell padding="checkbox" />
                    {expandComponent}
                </TableRow>
            )}
        </>
    );
};

function rowInput(value: any) {
    return <input>{value}</input>;
}

function processRows(data: ConstructionSettlement | ConstructionSettlementTable) {
    return (
        <>
            <TableCell component="th" scope="row">
                {rowInput(data.order)}
            </TableCell>
            <TableCell align="center">{rowInput(data.category)}</TableCell>
            <TableCell align="center">{rowInput(data.length)}</TableCell>
            <TableCell align="center">{rowInput(data.width)}</TableCell>
            <TableCell align="center">{rowInput(data.quantity)}</TableCell>
            <TableCell align="center">{rowInput(data.squareMeters)}</TableCell>
            <TableCell align="center">{rowInput(data.price)}</TableCell>
            <TableCell align="center">{rowInput(data.totalCost)}</TableCell>
        </>
    );
}

export default function TableList() {
    // const row1 = (
    //     <>
    //         <TableCell component="th" scope="row">
    //             {input}
    //         </TableCell>
    //         <TableCell align="center">{input}</TableCell>
    //         <TableCell align="center">{input}</TableCell>
    //         <TableCell align="center">{input}</TableCell>
    //         <TableCell align="center">{input}</TableCell>
    //     </>
    // );
    const defaultData = getDefaultData();
    return (
        <Paper
            style={{
                width: '100%',
                overflowX: 'auto'
            }}
        >
            <Table
                style={{
                    minWidth: 650
                }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" />
                        {columnType.map((col) => (
                            <TableCell align="center">{col.header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {rows.map((row) => (
                        <ExpandableTableRow key={row.name} expandComponent={row1}>
                            <TableCell component="th" scope="row">
                                {input}
                            </TableCell>
                            <TableCell align="center">{input}</TableCell>
                            <TableCell align="center">{input}</TableCell>
                            <TableCell align="center">{input}</TableCell>
                            <TableCell align="center">{input}</TableCell>
                        </ExpandableTableRow>
                    ))}
                     */}
                    {defaultData.map((row, indx) => (
                        <>
                            <ExpandableTableRow
                                key={indx}
                                expandComponent={
                                    <>
                                        {row.details?.map((i) => {
                                            return processRows(i);
                                        })}
                                    </>
                                }
                            >
                                {processRows(row)}
                            </ExpandableTableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
