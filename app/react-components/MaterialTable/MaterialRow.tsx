import { Collapse, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import useMaterialData from './hook/useMaterialData';
import { useState } from 'react';
import { TableHeader } from '.';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import useTableRowsLenght from './hook/useMaterialTableInformation';
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';

const InputCell = ({ width }: { width?: string }) => {
    return (
        <TableCell width={width}>
            <TextField
                onClick={(e) => {
                    e.stopPropagation();
                }}
                defaultValue={''}
                size="medium"
                onBlur={() => {}}
                onFocus={(e) => {}}
                multiline
                maxRows={4}
                fullWidth
                // InputProps={{
                //     endAdornment: !shouldMergeCells && (
                //         <InputAdornment position="end">{getUnit(field)}</InputAdornment>
                //     )
                // }}
            ></TextField>
        </TableCell>
    );
};

const InforCell = () => {
    return <TableCell></TableCell>;
};

const AccordionCell = ({ open }: { open: boolean }) => {
    return <TableCell>{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</TableCell>;
};

const MaterialCells = ({
    isAccordion,
    isAccordionOpen,
    data
}: {
    isAccordion?: boolean;
    isAccordionOpen?: boolean;
    data: ConstructionSettlementTable | ConstructionSettlement
}) => {
    const {order, category, length, width, quantity, squareMeters, price, totalCost} = data;
    return (
        <>
            <InforCell />
            <InputCell />
            <InputCell />
            <InputCell />
            <InputCell />
            <InforCell />
            <InputCell />
            <InforCell />
            {isAccordion ? <AccordionCell open={isAccordionOpen!} /> : <InforCell />}
        </>
    );
};

const MaterialRow = ({
    data, index
} : {
    data: ConstructionSettlementTable; 
    index: number;
}) => {
    const [open, setOpen] = useState(false);
    const { rowsNumber } = useTableRowsLenght();
    const { details } = data;
    return (
        <>
            <TableRow
                onClick={(e) => {
                    setOpen(!open);
                }}
            >
                <MaterialCells isAccordion isAccordionOpen={open} data={data}/>
            </TableRow>
            <TableRow>
                <TableCell colSpan={rowsNumber} padding="none">
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table>
                            <TableHeader hidden />
                            <TableBody>
                                <TableRow>
                                    {details ? 
                                        details.map((subRows, subIndex) => <MaterialCells data={subRows}/>
                                    )
                                : <></>}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default MaterialRow;
