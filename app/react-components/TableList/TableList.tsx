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
    TableContainer,
    Button
} from '@mui/material';

import {
    Delete,
    PlaylistAdd,
    PlusOne,
    CheckBox,
    CheckBoxOutlineBlank,
    Calculate
} from '@mui/icons-material';
import {
    getInitAccordionRowData,
    getInitDetailsRowData,
    getInitDetailsRowDataWithNumber,
    getInitTableData,
    getUnit,
    updateSelectAccRow,
    updateSelectSubRow,
    updateTableData
} from '~/utils';
import _ from 'lodash';
import { useState, useEffect, useMemo, useCallback } from 'react';

// Importing components
import { AccordionRow } from '..';

// Importing types
import type { ConstructionSettlement, ConstructionSettlementTable } from '~/types';

//Importing contants
import { colWidth, columnType } from '~/contants';

function TalbeHeader({ showCalculation }: { showCalculation: boolean }) {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="none" variant="head" width={colWidth.event} colSpan={2}>
                    {showCalculation ? (
                        <Button variant="contained" startIcon={<Calculate />}>
                            Tính
                        </Button>
                    ) : (
                        <></>
                    )}
                </TableCell>
                {columnType.map((col) => (
                    <TableCell
                        key={col.key}
                        align="center"
                        padding="none"
                        width={colWidth[col.key]}
                        variant="head"
                        sx={{ minWidth: '75px', fontWeight: 600 }}
                    >
                        {col.header}
                    </TableCell>
                ))}
                <TableCell variant="head" width={colWidth.event} padding="none" />
            </TableRow>
        </TableHead>
    );
}

function AddDefautlTableButton({ handleClick }: { handleClick: () => void }) {
    return (
        <TableRow>
            <TableCell colSpan={10}>
                <Tooltip title="Thêm hàng con">
                    <IconButton
                        size="large"
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        <PlaylistAdd />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}

export default function TableList() {
    const [tableData, setTableData] = useState(() => getInitTableData());
    const newTableData = useMemo(() => _.cloneDeep(tableData), [tableData]);

    const showCalculation = _.some(tableData, (row) => _.some(row.details, { isSelected: true }));

    const checkAndSetTableData = () => {
        console.time('Updating time');
        updateTableData(newTableData);
        console.timeEnd('Updating time');
        if (!_.isEqual(tableData, newTableData)) {
            setTableData(newTableData);
        }
    };

    useEffect(() => {
        // Update and format data of each row for the first render
        checkAndSetTableData();
    }, []);

    useEffect(() => {
        console.log(tableData);
    }, [tableData]);

    function ProcessedRow({
        data,
        isAccordionRow = false,
        accordionRowIndex,
        detailRowIndex
    }: {
        data: ConstructionSettlement | ConstructionSettlementTable;
        isAccordionRow?: boolean;
        accordionRowIndex: number;
        detailRowIndex?: number;
    }): JSX.Element {
        const isCalculateRow = String(data.length) === 'CỘNG';
        // Handle merge length, width and quantity
        const shouldMergeCells = String(data.length).includes('+') || isCalculateRow;

        const currentAccRow = newTableData[accordionRowIndex];
        let currentDetailRow: ConstructionSettlement;
        if (!_.isNil(detailRowIndex) && !_.isNil(currentAccRow.details))
            currentDetailRow = currentAccRow.details[detailRowIndex];

        const RowInput = ({
            value,
            field
        }: {
            value: string | number | null;
            field: keyof ConstructionSettlement;
        }) => {
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
                    currentAccRow[field] = e.target.value as never;
                } else if (currentDetailRow) {
                    currentDetailRow[field] = e.target.value as never;
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
                    fullWidth
                    InputProps={{
                        endAdornment: !shouldMergeCells && (
                            <InputAdornment position="end">{getUnit(field)}</InputAdornment>
                        )
                    }}
                ></TextField>
            );
        };

        const AddRemoveCell = () => {
            const handleEvent = (action: string): void => {
                switch (action) {
                    case 'remove':
                        if (isAccordionRow) {
                            newTableData.splice(accordionRowIndex, 1);
                        } else if (!_.isNil(detailRowIndex)) {
                            currentAccRow.details.splice(detailRowIndex, 1);
                        }
                        break;
                    case 'add':
                        if (isAccordionRow) {
                            newTableData.splice(
                                accordionRowIndex + 1,
                                0,
                                getInitAccordionRowData()
                            );
                        } else if (!_.isNil(detailRowIndex)) {
                            currentAccRow.details.splice(
                                detailRowIndex + 1,
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
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <br />
                    <Tooltip title="Thêm hàng mới ở dưới">
                        <IconButton
                            onClick={() => {
                                handleEvent('add');
                            }}
                        >
                            <PlusOne />
                        </IconButton>
                    </Tooltip>
                </>
            );
        };

        const RowContent = () => {
            return (
                <>
                    <TableCell
                        align="center"
                        padding="checkbox"
                        width={colWidth.event}
                        onClick={() => {
                            if (_.isEmpty(data.category)) return;
                            if (isAccordionRow) {
                                updateSelectAccRow(currentAccRow);
                            } else if (!_.isNil(detailRowIndex)) {
                                updateSelectSubRow(currentAccRow, detailRowIndex);
                            }
                            checkAndSetTableData();
                        }}
                    >
                        {_.isEmpty(data.category) ? (
                            <></>
                        ) : data.isSelected ? (
                            <CheckBox color="info" />
                        ) : (
                            <CheckBoxOutlineBlank color="info" />
                        )}
                    </TableCell>
                    <TableCell align="center">{data.order}</TableCell>
                    <TableCell align="center">
                        {isCalculateRow ? (
                            <></>
                        ) : (
                            <RowInput value={data.category} field="category" />
                        )}
                    </TableCell>
                    {shouldMergeCells ? (
                        <TableCell colSpan={3} align="center">
                            {isCalculateRow ? (
                                data.length
                            ) : (
                                <Tooltip title="Xóa dấu - để tách thành 3 hàng">
                                    <>
                                        <RowInput value={data.length} field="length" />
                                    </>
                                </Tooltip>
                            )}
                        </TableCell>
                    ) : (
                        <>
                            <TableCell align="center">
                                {
                                    <Tooltip title="Gõ dấu + để gộp 3 hàng">
                                        <>
                                            <RowInput value={data.length} field="length" />
                                        </>
                                    </Tooltip>
                                }
                            </TableCell>
                            <TableCell align="center">
                                <RowInput value={data.width} field="width" />
                            </TableCell>
                            <TableCell align="center">
                                <RowInput value={data.quantity} field="quantity" />
                            </TableCell>
                        </>
                    )}
                    <TableCell align="center">{data.squareMeters ?? ''}</TableCell>
                    <TableCell align="center">
                        {isCalculateRow || isAccordionRow ? (
                            <RowInput value={data.price} field="price" />
                        ) : (
                            <></>
                        )}
                    </TableCell>
                    <TableCell align="center">{data.totalCost}</TableCell>
                    <TableCell>
                        <AddRemoveCell />
                    </TableCell>
                </>
            );
        };

        return isAccordionRow ? (
            <RowContent />
        ) : (
            <TableRow draggable selected={data.isSelected}>
                <TableCell align="center" padding="checkbox" width={colWidth.event} />
                <RowContent />
            </TableRow>
        );
    }

    const addDefaultDetailsRows = useCallback(
        (id: number) => {
            const subRows = getInitDetailsRowDataWithNumber();
            const selectedAccordionRow = newTableData.find((accorRow) => accorRow.id === id);
            if (selectedAccordionRow) {
                selectedAccordionRow.details = subRows;
            }
            checkAndSetTableData();
        },
        [tableData]
    );

    const addDefaultAccordionRow = useCallback(() => {
        newTableData.push(getInitAccordionRowData());
        checkAndSetTableData();
    }, [tableData]);

    return (
        <Paper
            style={{
                width: '100%',
                overflow: 'hidden'
            }}
        >
            <TableContainer sx={{ maxHeight: '50vh' }}>
                <Table
                    style={{
                        minWidth: '1250px'
                    }}
                    stickyHeader
                    aria-label="Accordion table"
                >
                    <TalbeHeader showCalculation={showCalculation} />
                    <TableBody>
                        {tableData.length > 0 ? (
                            <>
                                {tableData.map((row, accordionIndex) => (
                                    <AccordionRow
                                        key={row.id}
                                        rowId={row.id!}
                                        addSubRowsCallback={addDefaultDetailsRows}
                                        expandComponent={
                                            <>
                                                {!_.isEmpty(row.details) &&
                                                    row.details.map((detail, subIndex) => (
                                                        <ProcessedRow
                                                            key={detail.id}
                                                            data={detail}
                                                            accordionRowIndex={accordionIndex}
                                                            detailRowIndex={subIndex}
                                                        />
                                                    ))}
                                            </>
                                        }
                                    >
                                        <ProcessedRow
                                            data={row}
                                            isAccordionRow
                                            accordionRowIndex={accordionIndex}
                                        />
                                    </AccordionRow>
                                ))}
                            </>
                        ) : (
                            <AddDefautlTableButton handleClick={addDefaultAccordionRow} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
