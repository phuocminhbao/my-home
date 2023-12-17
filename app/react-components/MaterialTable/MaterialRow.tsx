import { Collapse, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import useMaterialData from './hook/useMaterialData';
import { useState } from 'react';
import { TableHeader } from '.';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import useTableRowsLenght from './hook/useMaterialTableInformation';
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';
import { inputCellType } from '~/contants';
import _ from 'lodash';

const InputCell = ({data} : {data: string | number | null}) => {
    const inputType = inputCellType[typeof data]
    
    return (
        <TableCell>
            <TextField
                onClick={(e) => {
                    e.stopPropagation();
                }}
                type={inputType}
                inputMode='numeric'
                // defaultValue={data}
                size="medium"
                onBlur={() => {}}
                onFocus={(e) => {}}
                multiline={_.isString(data)}
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

const InforCell = ({data} : {data: string | number | null}) => {
    return <TableCell align='center'>{data}</TableCell>;
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
            <InforCell data={order}/>
            <InputCell data={category} dataKey='category'/>
            <InputCell data={length} dataKey='length'/>
            <InputCell data={width} dataKey='width'/>
            <InputCell data={quantity} dataKey='quantity'/>
            <InforCell data={squareMeters}/>
            <InputCell data={price} dataKey='price'/>
            <InforCell data={totalCost}/>
            {isAccordion ? <AccordionCell open={isAccordionOpen!} /> : <InforCell data={null}/>}
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
