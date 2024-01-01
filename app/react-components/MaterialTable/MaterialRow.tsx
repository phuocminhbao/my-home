import {
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';
import { useState } from 'react';
import { TableHeader } from '.';

import useTableRowsLenght from './hook/useMaterialTableInformation';
import { ConstructionSettlementTable } from '~/types';
import _ from 'lodash';
import { MaterialCells } from './MaterialCells';

const MaterialRow = ({ data }: { data: ConstructionSettlementTable; index: number }) => {
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
                <MaterialCells isAccordion isAccordionOpen={open} isDetailsEmpty= {_.isEmpty(details)}data={data} />
            </TableRow>
            <TableRow>
                <TableCell colSpan={rowsNumber} padding="none">
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table>
                            <TableHeader hidden />
                            <TableBody>
                                {details ? (
                                    details.map((subRows) => (
                                        <TableRow key={subRows.id}>
                                            <MaterialCells data={subRows} />
                                        </TableRow>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default MaterialRow;
