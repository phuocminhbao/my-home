// Importing from lib
import {
    TableRow,
    TableCell,
    Paper,
    Table,
    TableHead,
    TableBody,
    TextField,
    InputAdornment
} from '@mui/material';
import { getDefaultData, getUnit } from '~/utils';
import _ from 'lodash';
import { useState, Fragment, useCallback, useEffect } from 'react';

// Importing components
import { AccordionRow } from '..';

// Importing types
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';

//Importing contants
import { columnType } from '~/contants';

export default function TableList() {
    const [tableData, setTableData] = useState(getDefaultData());

    function processRow(
        data: ConstructionSettlement | ConstructionSettlementTable,
        isAccordionRow: boolean = false,
        accordionRowIndex: number,
        detailRowIndex?: number
    ): JSX.Element {
        const [shouldMergeCells, setShouldMergeCells] = useState(String(data.length).includes('+'));

        useEffect(() => {
            setShouldMergeCells(String(data.length).includes('+'));
        }, [data.length]);

        // Handle merge length, width and quantity
        // const shouldMergeCells = String(data.length).includes('+');;
        const rowInput = (
            value: string | number | null,
            field: keyof ConstructionSettlement
            // isMergedCell: boolean = false
        ) => {
            const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
                if (!data) return;

                // Don't do anything if not change
                if (e.currentTarget.value === value) {
                    return;
                }

                // Return default value if not change inital
                if (!e.currentTarget.value || e.currentTarget.value === '0') {
                    if (field === 'category') {
                        e.currentTarget.value = '';
                    } else e.currentTarget.value = '0';
                }

                let newTableData = [...tableData];
                if (isAccordionRow) {
                    newTableData[accordionRowIndex][field] = e.target.value as any;
                } else {
                    newTableData[accordionRowIndex].details![detailRowIndex!][field] = e.target
                        .value as any;
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
                <TextField
                    defaultValue={value ?? ''}
                    size="medium"
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    multiline
                    maxRows={4}
                    variant="filled"
                    fullWidth={shouldMergeCells}
                    InputProps={{
                        endAdornment: !shouldMergeCells && (
                            <InputAdornment position="end">{getUnit(field)}</InputAdornment>
                        )
                    }}
                ></TextField>
            );
        };

        const rowContent = (
            <>
                <TableCell align="center">{data.order}</TableCell>
                <TableCell align="center">{rowInput(data.category, 'category')}</TableCell>
                {shouldMergeCells ? (
                    <TableCell colSpan={3}>{rowInput(data.length, 'length')} </TableCell>
                ) : (
                    <>
                        <TableCell align="center">{rowInput(data.length, 'length')}</TableCell>
                        <TableCell align="center">{rowInput(data.width, 'width')}</TableCell>
                        <TableCell align="center">{rowInput(data.quantity, 'quantity')}</TableCell>
                    </>
                )}
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
    useEffect(() => {
        console.log(tableData);
    }, [tableData]);

    return (
        <Paper
            style={{
                width: '100%',
                overflowX: 'auto'
            }}
        >
            <Table
                style={{
                    minWidth: 'fit-content',
                    textSizeAdjust: '1.5rem'
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
