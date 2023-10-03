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
import { useState, Fragment, useCallback, useEffect } from 'react';

export default function TableList() {
    const [tableData, setTableData] = useState(getDefaultData());
    // const tableData = get();
    function processRow(
        data: ConstructionSettlement | ConstructionSettlementTable,
        isAccordionRow: boolean = false,
        accordionRowIndex: number,
        detailRowIndex?: number
    ): JSX.Element {
        const rowInput = useCallback(
            (value: string | number | null, field: keyof ConstructionSettlementTable) => {
                const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
                    if (!data || accordionRowIndex) return;

                    // Return default value if not change inital
                    if (!e.currentTarget.value) {
                        if (field === 'category') {
                            e.currentTarget.value = '';
                        } else e.currentTarget.value = '0';
                    }

                    // Don't do anything if not change
                    if (e.currentTarget.value === value) {
                        return;
                    }

                    let newTableData = [...tableData];
                    if (!detailRowIndex) {
                        newTableData[accordionRowIndex][field] = e.target.value as any;
                    } else {
                        newTableData[accordionRowIndex].details![detailRowIndex] = e.target.value as any;
                    }
                    setTableData(newTableData);
                };
                const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
                    // Remove default value when focus
                    if (e.target.value === '0') {
                        e.target.value = '';
                    }
                };
                return (
                    <input
                        defaultValue={value ?? ''}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    ></input>
                );
            },
            []
        );

        // useEffect(() => {
        //     console.log(tableData);
        // }, [tableData]);

        const rowContent = (
            <>
                <TableCell align="center">{data.order}</TableCell>
                <TableCell align="center">{rowInput(data.category, 'category')}</TableCell>
                <TableCell align="center">{rowInput(data.length, 'length')}</TableCell>
                <TableCell align="center">{rowInput(data.width, 'width')}</TableCell>
                <TableCell align="center">{rowInput(data.quantity, 'quantity')}</TableCell>
                <TableCell align="center">{data.squareMeters}</TableCell>
                <TableCell align="center">{rowInput(data.price, 'price')}</TableCell>
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
                    {tableData.map((row, accordionIndex) => (
                        <AccordionRow
                            key={accordionIndex}
                            expandComponent={
                                <>
                                    {row.details?.map((detail, subIndex) => (
                                        <Fragment key={subIndex}>
                                            {processRow(detail, false, accordionIndex, subIndex)}
                                        </Fragment>
                                    ))}
                                </>
                            }
                        >
                            {processRow(row, true, accordionIndex)}
                        </AccordionRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
