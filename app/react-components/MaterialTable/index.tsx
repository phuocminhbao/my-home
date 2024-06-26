import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { EXCEL_PATH, MIN_TABLE_WIDTH, TOTAL_SUM_VALUE, colWidth, columnType } from '~/contants';
import useMaterialData from './hook/useMaterialData';
import { MaterialDataProvider } from './provider/MaterialDataProvider';
import GenerateMaterialRow from './GenerateMaterialRow';
import { useEffect } from 'react';
import MaterialRow from './MaterialRow';
import { InforCell } from './MaterialCells';
import useSubmitData from '~/hook/useSubmitData';
import _ from 'lodash';
import { ConstructionSettlementTable } from '~/types';

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

const SubmitConstructDataCell = () => {
    const { data, getFinalCost } = useMaterialData();
    const { submitData } = useSubmitData();
    const handleSubmit = () => {
        const clonedData = _.cloneDeep(data);
        clonedData.push({
            length: TOTAL_SUM_VALUE,
            totalCost: getFinalCost()
        } as ConstructionSettlementTable);
        submitData(JSON.stringify(clonedData), EXCEL_PATH);
    };
    return (
        <TableCell>
            <Button onClick={handleSubmit}>Do Excel</Button>
        </TableCell>
    );
};

const FinalCostRow = () => {
    const { getFinalCost } = useMaterialData();

    return (
        <TableRow>
            <InforCell colSpan={7} value={TOTAL_SUM_VALUE} />
            <InforCell value={getFinalCost()} />
            <SubmitConstructDataCell />
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
            <Typography variant="h3">Quyết toán công trình </Typography>
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
