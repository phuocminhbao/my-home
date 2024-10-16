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
import axios from 'axios';
import fileSaver from 'file-saver';

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
    const submitData = () => {
        const clonedData = _.cloneDeep(data);
        clonedData.push({
            length: TOTAL_SUM_VALUE,
            totalCost: getFinalCost()
        } as ConstructionSettlementTable);
        return clonedData;
    };
    // const handleClick = async () => {
    //     const formData = new FormData();
    //     formData.append('data', submitData());
    //     submit(formData, EXCEL_PATH, FETCHER_KEY.EXCEL);
    // };
    const handleClick = async () => {
        // const formData = new FormData();
        // formData.append('data', submitData());
        // const res = await fetch(`${window.location.href}?_data=routes%2Fexcel`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     body: new URLSearchParams(formData as unknown as Record<string, string>)
        // });
        const res = await axios.post(
            '/excel/download',
            {
                constructionName,
                data: submitData()
            },
            {
                responseType: 'blob'
            }
        );
        const contentType = res.headers['Content-Type'];
        if (contentType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            throw new Error('Unexpected file type');
        }
        const blob = res.data;
        fileSaver.saveAs(blob, 'contring.xlsx');
        // const url = window.URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'generatedExcel.xlsx');
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link); // Clean up Clean up
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
                        <TableBodyContent
                            constructionName={constructionNameRef.current?.nodeValue ?? ''}
                        />
                    </Table>
                </TableContainer>
            </MaterialDataProvider>
        </Paper>
    );
};

export default MaterialTable;
