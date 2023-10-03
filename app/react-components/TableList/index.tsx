// Importing from lib
import { TableRow, TableCell, IconButton, Paper, Table, TableHead, TableBody } from '@mui/material';
import { columnType, getDefaultData } from '~/utils/dataUtil';

// Importing components
import AccordionRow from './AccordionRow';

// Importing types
import {
    ConstructionSettlement,
    ConstructionSettlementTable
} from '~/types/ExcelModel/ConstructionSettlement';
import { useState, Fragment, useCallback } from 'react';

export default function TableList() {
    const [tableData, setTableData] = useState(getDefaultData());
    // const tableData = get();
    function processRow(
        data: ConstructionSettlement | ConstructionSettlementTable,
        isAccordionRow: boolean = false,
        accordionRowIndex: number,
        detailRowIndex?: number
    ): JSX.Element {
        const rowInput = useCallback((value?: string | number, field: string) => {
            const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
                let newTableData = [...tableData]
                newTableData[accordionRowIndex][field]
                setTableData(newTableData);
            };
            return (
                <input
                    value={value}
                    onBlur={(e) => {
                        return (value = e.target.value);
                    }}
                ></input>
            );
        }, []);
        const rowContent = (
            <>
                <TableCell align="center">{data.order}</TableCell>
                <TableCell align="center">{rowInput(data.category)}</TableCell>
                <TableCell align="center">{rowInput(data.length)}</TableCell>
                <TableCell align="center">{rowInput(data.width)}</TableCell>
                <TableCell align="center">{rowInput(data.quantity)}</TableCell>
                <TableCell align="center">{data.squareMeters}</TableCell>
                <TableCell align="center">{rowInput(data.price)}</TableCell>
                <TableCell align="center">{data.totalCost}</TableCell>
            </>
        );

        return isAccordionRow ? (
            rowContent
        ) : (
            <TableRow>
                {<TableCell padding="checkbox" />}
                {rowContent}
            </TableRow>
        );
    }
    return (
        <Paper
            style={{
                width: '100%',
                overflowX: 'auto'
            }}
        >
            <Table
                style={{
                    minWidth: 'fit-content'
                }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" />
                        {columnType.map((col) => (
                            <TableCell key={col.key} align="center">
                                {col.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row, indx) => (
                        <AccordionRow
                            key={indx}
                            expandComponent={
                                <>
                                    {/* {row.details?.map((detail, index) => (
                                        <Fragment key={index}>{processRow(detail)}</Fragment>
                                    ))} */}
                                </>
                            }
                        >
                            {processRow(row, true, indx)}
                        </AccordionRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
