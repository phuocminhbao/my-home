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
                        {col.header}
                    </TableCell>
                ))}
                <TableCell>
                    <></>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

const TableBodyContent = () => {
    const { data, forceUpdateData } = useMaterialData();
    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        forceUpdateData();
    },[])
    return (
        <TableBody>
            {data.length > 0 ? (
                data.map((row, index) => <MaterialRow key={row.id} data={row} index={index}/>)
            ) : (
                <GenerateMaterialRow />
            )}
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
            <MaterialDataProvider>
                <TableContainer 
                // sx={{ maxHeight: '50vh' }}
                >
                    <Table>
                        <TableHeader />
                        <TableBodyContent />
                    </Table>
                </TableContainer>
            </MaterialDataProvider>
        </Paper>
    );
};

export default MaterialTable;
