import { Collapse, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import useMaterialData from './hook/useMaterialData';
import { useState } from 'react';
import { TableHeader } from '.';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

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
    isAccordionOpen
}: {
    isAccordion?: boolean;
    isAccordionOpen?: boolean;
}) => {
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

const MaterialRow = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <TableRow
                onClick={(e) => {
                    setOpen(!open);
                }}
            >
                <MaterialCells isAccordion isAccordionOpen={open} />
            </TableRow>
            <TableRow>
                {/* // TODO: make colspan dynamic with lenght of table cells */}
                <TableCell colSpan={9} padding="none">
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table>
                            <TableHeader hidden />
                            <TableBody>
                                <TableRow>
                                    <MaterialCells />
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
