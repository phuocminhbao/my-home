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
    Tooltip,
    TableContainer
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import {
    getInitAccordionRowData,
    getInitDetailsRowData,
    getInitDetailsRowDataWithNumber,
    getInitTableData,
    getUnit,
    updateTableData
} from '~/utils';
import _ from 'lodash';
import { useState, Fragment, useEffect, useMemo } from 'react';

// Importing components
import { AccordionRow } from '..';

// Importing types
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';

//Importing contants
import { columnType, getColWidth } from '~/contants';
// import { initAccordionRowData, initDetailsRowData } from '~/contants/table';

export default function TableList() {
    const [tableData, setTableData] = useState(() => getInitTableData());
    const newTableData = useMemo(() => _.cloneDeep(tableData), [tableData]);

    const checkAndSetTableData = () => {
        updateTableData(newTableData);
        if (!_.isEqual(tableData, newTableData)) {
            setTableData(newTableData);
        }
    };

    useEffect(() => {
        // Update order of each row
        checkAndSetTableData();
    }, []);

    useEffect(() => {
        console.log(tableData);
    }, [tableData]);

    function processRow(
        data: ConstructionSettlement | ConstructionSettlementTable,
        isAccordionRow: boolean = false,
        accordionRowIndex: number,
        detailRowIndex?: number
    ): JSX.Element {
        // Handle merge length, width and quantity
        const shouldMergeCells = String(data.length).includes('+');
        const rowInput = (value: string | number | null, field: keyof ConstructionSettlement) => {
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

                if (isAccordionRow) {
                    newTableData[accordionRowIndex][field] = e.target.value as never;
                } else {
                    newTableData[accordionRowIndex].details![detailRowIndex!][field] = e.target
                        .value as never;
                }
                checkAndSetTableData();
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
                            newTableData.splice(
                                accordionRowIndex + 1,
                                0,
                                getInitAccordionRowData()
                            );
                        } else {
                            newTableData[accordionRowIndex].details?.splice(
                                detailRowIndex! + 1,
                                0,
                                getInitDetailsRowData()
                            );
                        }
                        break;
                    default:
                        throw new Error('Unexpected action');
                }
                checkAndSetTableData();
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
                    <TableCell colSpan={3}>
                        {
                            <Tooltip title="Xóa dấu - để tách thành 3 hàng">
                                {rowInput(data.length, 'length')}
                            </Tooltip>
                        }
                    </TableCell>
                ) : (
                    <>
                        <TableCell align="center">
                            {
                                <Tooltip title="Gõ dấu + để gộp 3 hàng">
                                    {rowInput(data.length, 'length')}
                                </Tooltip>
                            }
                        </TableCell>
                        <TableCell align="center">{rowInput(data.width, 'width')}</TableCell>
                        <TableCell align="center">{rowInput(data.quantity, 'quantity')}</TableCell>
                    </>
                )}
                <TableCell align="center">{data.squareMeters ?? ''}</TableCell>
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

    function addDefaultDetailsRows(id: number) {
        const subRows = getInitDetailsRowDataWithNumber();
        const selectedAccordionRow = newTableData.find((accorRow) => accorRow.id === id);
        if (selectedAccordionRow) {
            selectedAccordionRow.details = subRows;
        }
        checkAndSetTableData();
    }

    return (
        <Paper
            style={{
                width: '100%',
                overflow: 'hidden'
            }}
        >
            <TableContainer sx={{ maxHeight: '100vh' }}>
                <Table
                    style={{
                        minWidth: 'fit-content'
                    }}
                    stickyHeader
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" />
                            {columnType.map((col) => (
                                <TableCell
                                    key={col.key}
                                    align="center"
                                    width={getColWidth[col.key]}
                                >
                                    {col.header}
                                </TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, accordionIndex) => (
                            <AccordionRow
                                key={row.id}
                                rowId={row.id!}
                                addSubRowsCallback={addDefaultDetailsRows}
                                expandComponent={
                                    <>
                                        {row.details?.map((detail, subIndex) => (
                                            <Fragment key={detail.id}>
                                                {processRow(
                                                    detail,
                                                    false,
                                                    accordionIndex,
                                                    subIndex
                                                )}
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
            </TableContainer>
        </Paper>
    );
}
