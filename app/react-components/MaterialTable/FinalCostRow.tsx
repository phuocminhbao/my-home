import { TableCell, Button, TableRow } from '@mui/material';
import { TOTAL_SUM_VALUE } from '~/constants';
import { generateExcel } from '~/services';
import type { ConstructionSettlementTable } from '~/types';
import { download } from '~/utils';
import { InforCell } from './MaterialCells';
import useMaterialData from './hook/useMaterialData';
import { useContext } from 'react';
import ConstructionContext from './context/ConstructionContext';

const SubmitConstructDataCell = () => {
    const { data, getFinalCost } = useMaterialData();
    const constructionName = useContext(ConstructionContext);
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

export default FinalCostRow;
