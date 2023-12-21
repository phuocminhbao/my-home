import { Collapse, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import useMaterialData from './hook/useMaterialData';
import { useState } from 'react';
import { TableHeader } from '.';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import useTableRowsLenght from './hook/useMaterialTableInformation';
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';
import { inputCellType } from '~/contants';
import _ from 'lodash';
import { proccessValueType } from '~/utils/common';

const InputCell = ({
    value,
    dataKey,
    updateValue
} : {
    value: string | number | null; 
    dataKey: keyof ConstructionSettlement;
    updateValue: (key: keyof ConstructionSettlement, value: String | number | null) => void
}) => {
    const inputType = inputCellType[typeof value]

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const valueToUpdate = proccessValueType(dataKey, e.target.value);
        updateValue(dataKey, valueToUpdate);
    }
    return (
        <TableCell>
            <TextField
                onClick={(e) => {
                    e.stopPropagation();
                }}
                type={inputType}
                inputMode='numeric'
                defaultValue={value}
                size="medium"
                onBlur={handleBlur}
                onFocus={(e) => {}}
                multiline={_.isString(value)}
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

const InforCell = ({value} : {value: string | number | null}) => {
    return <TableCell align='center'>{value}</TableCell>;
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
    const { updateRowDataById } = useMaterialData();
    const {id, order, category, length, width, quantity, squareMeters, price, totalCost} = data;

    const updateValue = (key: keyof ConstructionSettlement, value: String | number | null) => {
        updateRowDataById(id, key, value)
    }
    return (
        <>
            <InforCell value={order}/>
            <InputCell value={category} dataKey='category' updateValue={updateValue}/>
            <InputCell value={length} dataKey='length' updateValue={updateValue}/>
            <InputCell value={width} dataKey='width' updateValue={updateValue}/>
            <InputCell value={quantity} dataKey='quantity' updateValue={updateValue}/>
            <InforCell value={squareMeters}/>
            <InputCell value={price} dataKey='price' updateValue={updateValue}/>
            <InforCell value={totalCost}/>
            {isAccordion ? <AccordionCell open={isAccordionOpen!} /> : <InforCell value={null}/>}
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
                                    {details ? 
                                        details.map((subRows, subIndex) => 
                                            <TableRow key={subRows.id} >
                                                <MaterialCells data={subRows}/>
                                            </TableRow>
                                    )
                                : <></>}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default MaterialRow;
