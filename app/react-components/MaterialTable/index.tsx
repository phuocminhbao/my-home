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
import { MIN_TABLE_WIDTH, ROUTE_PATH, TOTAL_SUM_VALUE, colWidth, columnType } from '~/constants';
import useMaterialData from './hook/useMaterialData';
import { MaterialDataProvider } from './provider/MaterialDataProvider';
import GenerateMaterialRow from './GenerateMaterialRow';
import { useEffect, useRef, useState } from 'react';
import MaterialRow from './MaterialRow';
import { InforCell } from './MaterialCells';
import _ from 'lodash';
import type { ConstructionSettlementTable } from '~/types';
import axios from 'axios';
import fileSaver from 'file-saver';
import { generateExcel } from '~/services';
import { download } from '~/utils';

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

const SubmitConstructDataCell = ({ constructionName }: { constructionName: string }) => {
    const { data, getFinalCost } = useMaterialData();
    const handleClick = async () => {
        const { excelBlob, fileName } = await generateExcel({
            constructionName,
            data: [
                ...data,
                {
                    length: TOTAL_SUM_VALUE,
                    totalCost: getFinalCost()
                } as ConstructionSettlementTable
            ]
        });
        download(excelBlob, fileName);
    };
    return (
        <TableCell>
            <Button onClick={handleClick}>Excel</Button>
        </TableCell>
    );
};

const FinalCostRow = ({ constructionName }: { constructionName: string }) => {
    const { getFinalCost } = useMaterialData();

    return (
        <TableRow>
            <InforCell colSpan={7} value={TOTAL_SUM_VALUE} />
            <InforCell value={getFinalCost()} />
            <SubmitConstructDataCell constructionName={constructionName} />
        </TableRow>
    );
};

const TableBodyContent = ({ constructionName }: { constructionName: string }) => {
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
            <FinalCostRow constructionName={constructionName} />
        </TableBody>
    );
};

const MaterialTable = () => {
    const constructionNameRef = useRef<HTMLInputElement>(null);
    const [constructionName, setConstructionName] = useState('');
    useEffect(() => {
        if (!constructionNameRef) return;
        constructionNameRef.current?.focus();
    }, []);
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
                    onBlur={(e) => {
                        setConstructionName(e.target.value);
                    }}
                />
            </Typography>
            <MaterialDataProvider>
                <TableContainer>
                    <Table size="medium">
                        <TableHeader />
                        <TableBodyContent constructionName={constructionName} />
                    </Table>
                </TableContainer>
            </MaterialDataProvider>
        </Paper>
    );
};

export default MaterialTable;
