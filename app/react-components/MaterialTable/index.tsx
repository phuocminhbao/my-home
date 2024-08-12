import {
    Button,
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
import { MIN_TABLE_WIDTH, TOTAL_SUM_VALUE, colWidth, columnType } from '~/constants';
import useMaterialData from './hook/useMaterialData';
import { MaterialDataProvider } from './provider/MaterialDataProvider';
import GenerateMaterialRow from './GenerateMaterialRow';
import { useEffect, useRef } from 'react';
import MaterialRow from './MaterialRow';
import { InforCell } from './MaterialCells';
import _ from 'lodash';
import type { ConstructionSettlementTable } from '~/types';

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

const SubmitConstructDataCell = () => {
    const { data, getFinalCost, saveToLocalStorage } = useMaterialData();
    const submitData = (): string => {
        const clonedData = _.cloneDeep(data);
        clonedData.push({
            length: TOTAL_SUM_VALUE,
            totalCost: getFinalCost()
        } as ConstructionSettlementTable);
        return JSON.stringify(clonedData);
    };
    return (
        <TableCell>
            <input name="data" defaultValue={submitData()} hidden></input>
            <Button type="submit">Xuất Excel</Button>
            <Button onClick={saveToLocalStorage}> Debounce</Button>
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
    const constructionNameRef = useRef<HTMLDivElement>(null);
    return (
        <Paper
            style={{
                width: '100%',
                overflow: 'hidden'
            }}
        >
            <Typography
                variant="h3"
                align="center"
                onClick={() => {
                    if (!constructionNameRef) return;
                    constructionNameRef.current?.focus();
                }}
            >
                BẢNG QUYẾT TOÁN CÔNG TRÌNH
                <TextField
                    fullWidth
                    id="construction-name"
                    inputRef={constructionNameRef}
                    variant="standard"
                    name="constructionName"
                    size="medium"
                    inputProps={{ style: { textAlign: 'center', fontSize: '3em' } }}
                />
            </Typography>
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
