import { PlaylistAdd } from '@mui/icons-material';
import { TableRow, TableCell, Tooltip, IconButton } from '@mui/material';
import useMaterialData from './hook/useMaterialData';

const GenerateMaterialRow = () => {
    const { data, generateData } = useMaterialData();
    return (
        <TableRow>
            <TableCell colSpan={10}>
                <Tooltip title="Thêm hàng con">
                    <IconButton
                        size="large"
                        onClick={() => {
                            generateData();
                        }}
                    >
                        <PlaylistAdd />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default GenerateMaterialRow;
