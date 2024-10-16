import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { MIN_TABLE_WIDTH, colWidth, columnType } from '~/constants';
import useMaterialData from './hook/useMaterialData';
import { MaterialDataProvider } from './provider/MaterialDataProvider';
import GenerateMaterialRow from './GenerateMaterialRow';
import { useEffect, useRef, useState } from 'react';
import MaterialRow from './MaterialRow';
import _ from 'lodash';
import FinalCostRow from './FinalCostRow';
import Construction from './Construction';
import TotalPriceText from './TotalPriceText';

export const TableHeader = ({ hidden }: { hidden?: boolean }) => {
    return (
        <TableHead style={hidden ? { visibility: 'collapse' } : {}}>
            <TableRow>
                {columnType.map((col) => (
                    <TableCell
                        key={col.key}
                        align="center"
                        padding="none"
                        width={colWidth[col.key]}
                        variant="head"
                        sx={{ minWidth: MIN_TABLE_WIDTH, backgroundColor: 'lightgray' }}
                    >
                        <h2>{col.header}</h2>
                    </TableCell>
                ))}
                <TableCell sx={{ backgroundColor: 'lightgray' }}>
                    <></>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

const TableBodyContent = () => {
    const { data } = useMaterialData();

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <TableBody>
            {data.length > 0 ? (
                data.map((row, index) => <MaterialRow key={row.id} data={row} index={index} />)
            ) : (
                <GenerateMaterialRow />
            )}
            <FinalCostRow />
        </TableBody>
    );
};

const MaterialTable = () => {
    return (
        <Paper
            style={{
                width: '100%',
                overflow: 'hidden'
            }}
        >
            <Construction>
                <MaterialDataProvider>
                    <>
                        <TableContainer>
                            <Table size="medium">
                                <TableHeader />
                                <TableBodyContent />
                            </Table>
                        </TableContainer>
                        <TotalPriceText />
                    </>
                </MaterialDataProvider>
            </Construction>
        </Paper>
    );
};

export default MaterialTable;
