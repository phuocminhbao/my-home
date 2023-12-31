import {
    KeyboardArrowUp,
    KeyboardArrowDown,
    Delete,
    Add,
    Menu as MenuIcon
} from '@mui/icons-material';
import { TableCell, TextField, Grid, Menu, MenuItem } from '@mui/material';
import _ from 'lodash';
import { useState, ReactNode } from 'react';
import { VALID_INPUT_RESULT, inputCellType } from '~/contants';
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';
import { validateInput } from '~/utils';
import { proccessValueType } from '~/utils/common';
import useMaterialData from './hook/useMaterialData';

const InputCell = ({
    value,
    dataKey,
    updateValue
}: {
    value: string | number | null;
    dataKey: keyof ConstructionSettlement;
    updateValue: (key: keyof ConstructionSettlement, value: string | number | null) => void;
}) => {
    const [isInputValid, setIsInputValid] = useState(VALID_INPUT_RESULT);
    if (value === null) return <TableCell />;

    const inputType = inputCellType[typeof value];

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        const valueToUpdate = proccessValueType(dataKey, e.target.value);

        // Do nothing when value not change
        if (valueToUpdate === value) {
            e.target.value = valueToUpdate.toString();
            !isInputValid.okay && setIsInputValid(VALID_INPUT_RESULT);
            return;
        }

        if (valueToUpdate === 0) {
            e.target.value = valueToUpdate.toString();
        }

        const validateResult = validateInput(dataKey, valueToUpdate);
        if (validateResult.okay) {
            !isInputValid.okay && setIsInputValid(VALID_INPUT_RESULT);
            updateValue(dataKey, valueToUpdate);
        } else {
            setIsInputValid(validateResult);
            return;
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        if (e.target.value === '0') {
            e.target.value = '';
        }
    };
    return (
        <TableCell>
            <TextField
                onClick={(e) => {
                    e.stopPropagation();
                }}
                type={inputType}
                inputMode="numeric"
                defaultValue={value}
                size="medium"
                onBlur={handleBlur}
                onFocus={handleFocus}
                multiline={_.isString(value)}
                maxRows={4}
                error={!isInputValid.okay}
                helperText={isInputValid.error}
                fullWidth
                // InputProps={{
                //     endAdornment: !shouldMergeCells && (
                //         <InputAdornment position="end">{getUnit(field)}</InputAdornment>
                //     )
                // }}
            ></TextField>
        </TableCell>
    );
};

const InforCell = ({ value }: { value: string | number | ReactNode | null }) => {
    return (
        <TableCell align={typeof value === 'object' ? 'left' : 'center'}>
            <div onClick={(e) => e.stopPropagation()}>{value}</div>
        </TableCell>
    );
};

const AccordionCell = ({ open, rowId }: { open: boolean; rowId: number }) => {
    return (
        <TableCell>
            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <EventMenuCell rowId={rowId} />
                </Grid>
                <Grid item>{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</Grid>
            </Grid>
        </TableCell>
    );
};

const EventMenuCell = ({ rowId }: { rowId: number }) => {
    const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
    const { removeRowById, addRowAboveById, addRowBelowById } = useMaterialData();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (option: 'delete' | 'addBelow' | 'addAbove') => {
        switch (option) {
            case 'delete':
                removeRowById(rowId);
                break;
            case 'addAbove':
                addRowAboveById(rowId);
                break;
            case 'addBelow':
                addRowBelowById(rowId);
                break;
            default:
                break;
        }
        setAnchorEl(null);
    };
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <MenuIcon onClick={handleClick} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItem onClick={() => handleClose('delete')}>
                    <Delete />
                    Xoá hàng này
                </MenuItem>
                <MenuItem onClick={() => handleClose('addBelow')}>
                    <Add />
                    Thêm 1 hàng bên dưới
                </MenuItem>
                <MenuItem onClick={() => handleClose('addAbove')}>
                    <Add />
                    Thêm 1 hàng bên trên
                </MenuItem>
            </Menu>
        </div>
    );
};

const MaterialCells = ({
    isAccordion,
    isAccordionOpen,
    data
}: {
    isAccordion?: boolean;
    isAccordionOpen?: boolean;
    data: ConstructionSettlementTable | ConstructionSettlement;
}) => {
    const { updateRowDataById } = useMaterialData();
    const { id, order, category, length, width, quantity, squareMeters, price, totalCost } = data;

    const updateValue = (key: keyof ConstructionSettlement, value: string | number | null) => {
        updateRowDataById(id, key, value);
    };

    return (
        <>
            <InforCell value={order} />
            <InputCell value={category} dataKey="category" updateValue={updateValue} />
            <InputCell value={length} dataKey="length" updateValue={updateValue} />
            <InputCell value={width} dataKey="width" updateValue={updateValue} />
            <InputCell value={quantity} dataKey="quantity" updateValue={updateValue} />
            <InforCell value={squareMeters} />
            <InputCell value={price} dataKey="price" updateValue={updateValue} />
            <InforCell value={totalCost} />
            {isAccordion ? (
                <AccordionCell open={isAccordionOpen!} rowId={id} />
            ) : (
                <InforCell value={<EventMenuCell rowId={id} />} />
            )}
        </>
    );
};

export { AccordionCell, EventMenuCell, InforCell, InputCell, MaterialCells };
