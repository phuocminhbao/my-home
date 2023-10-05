// Importing from lib
import {
    TableRow,
    TableCell,
    Paper,
    Table,
    TableHead,
    TableBody,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { getUnit, updateTableData } from '~/utils';
import _ from 'lodash';
import { useState, Fragment, useEffect } from 'react';

// Importing components
import { AccordionRow } from '..';

// Importing types
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';

//Importing contants
import { columnType, getColWidth, initTableData } from '~/contants';
import { initAccordionRowData, initDetailsRowData } from '~/contants/table';

export default function TableList() {
    const [tableData, setTableData] = useState(initTableData);

    const checkAndSetTableData = (newTableData: ConstructionSettlementTable[]) => {
        if(!_.isEqual(tableData, newTableData)) {
            setTableData(newTableData);
        }
    }

    useEffect(() => {
        updateTableData();
        console.log(tableData);
    }, [tableData]);

    function processRow(
        data: ConstructionSettlement | ConstructionSettlementTable,
        isAccordionRow: boolean = false,
        accordionRowIndex: number,
        detailRowIndex?: number
    ): JSX.Element {

        // TODO: Handle merge length, width and quantity
        const shouldMergeCells = String(data.length).includes('+');
        const rowInput = (
            value: string | number | null,
            field: keyof ConstructionSettlement
        ) => {
            const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
                if(!data) return;

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

                const newTableData = _.cloneDeep(tableData);
                if (isAccordionRow) {
                    newTableData[accordionRowIndex][field] = e.target.value as any;
                } else {
                    newTableData[accordionRowIndex].details![detailRowIndex!][field] = e.target
                        .value as any;
                }
                checkAndSetTableData(newTableData);
            };
            const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
                // Remove default value when focus
                if (e.target.value === '0') {
                    e.target.value = '';
                }
            };

            return (
                <TextField
                    style={{
                        fontSize: '1.5rem'
                    }}
                    defaultValue={value ?? ''}
                    size="medium"
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    multiline
                    maxRows={4}
                    variant="filled"
                    fullWidth
                    InputProps={{
                        endAdornment: !shouldMergeCells && (
                            <InputAdornment position="end">{getUnit(field)}</InputAdornment>
                        )
                    }}
                ></TextField>
            );
        };

        const rowEventCell = () => {
            const handleEvent = (action: string): void => {
                const newTableData = _.cloneDeep(tableData);
                switch (action) {
                    case 'remove':
                        if (isAccordionRow) {
                            newTableData.splice(accordionRowIndex, 1);
                        } else {
                            newTableData[accordionRowIndex].details?.splice(detailRowIndex!, 1);
                        }
                        break;
                    case 'add':
                        if (isAccordionRow) {
                            newTableData.splice(accordionRowIndex + 1, 0, initAccordionRowData);
                        } else {
                            newTableData[accordionRowIndex].details?.splice(detailRowIndex! + 1, 0, initDetailsRowData);
                        }
                        break;
                    default: throw new Error('Unexpected action');
                }
                checkAndSetTableData(newTableData);
            };
            return (
                <>
                    <Tooltip title="Xóa hàng hiện tại">
                        <IconButton
                            onClick={() => {
                                handleEvent('remove');
                            }}
                        >
                            <Remove />
                        </IconButton>
                    </Tooltip>
                    <br />
                    <Tooltip title="Thêm hàng mới ở dưới">
                        <IconButton
                            onClick={() => {
                                handleEvent('add');
                            }}
                        >
                            <Add />
                        </IconButton>
                    </Tooltip>
                </>
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
                <TableCell>{rowEventCell()}</TableCell>
            </>
        );

        return isAccordionRow ? (
            rowContent
        ) : (
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
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
                    minWidth: 'fit-content',
                }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" />
                        {columnType.map((col) => (
                            <TableCell key={col.key} align="center" width={getColWidth[col.key]}>
                                {col.header}
                            </TableCell>
                        ))}
                        <TableCell />
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
