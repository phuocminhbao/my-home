import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { MIN_TABLE_WIDTH, colWidth, columnType } from '~/contants';
import useMaterialData from './hook/useMaterialData';
import { MaterialDataProvider } from './provider/MaterialDataProvider';
import GenerateMaterialRow from './GenerateMaterialRow';
import { useEffect } from 'react';
import MaterialRow from './MaterialRow';
import { InforCell } from './MaterialCells';

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
                        sx={{ minWidth: MIN_TABLE_WIDTH }}
                    >
                        <h2>{col.header}</h2>
                    </TableCell>
                ))}
                <TableCell>
                    <></>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

const FinalCostRow = () => {
    const { data } = useMaterialData();
    const finalCost = (): number => {
        let cost = 0;
        data.forEach((mainRow) => {
            cost += mainRow.totalCost ?? 0;
            mainRow.details.forEach((subRow) => {
                if (subRow.totalCost) {
                    cost += subRow.totalCost;
                }
            });
        });
        return cost;
    };
    return (
        <TableRow>
            <InforCell colSpan={7} value="TỔNG CỘNG" />
            <InforCell value={finalCost()} />
        </TableRow>
    );
};

const TableBodyContent = () => {
    const { data, forceUpdateData } = useMaterialData();
    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        forceUpdateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
            <h1>Quyết toán công trình </h1>
            <MaterialDataProvider>
                <TableContainer>
                    <Table size="medium">
                        <TableHeader />
                        <TableBodyContent />
                    </Table>
                </TableContainer>
            </MaterialDataProvider>
        </Paper>
    );
};

export default MaterialTable;
