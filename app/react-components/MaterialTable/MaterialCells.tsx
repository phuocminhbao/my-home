import {
    KeyboardArrowUp,
    KeyboardArrowDown,
    Delete,
    Add,
    Menu as MenuIcon
} from '@mui/icons-material';
import {
    TableCell,
    TextField,
    Grid,
    Menu,
    MenuItem,
    InputAdornment,
    Button,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import _ from 'lodash';
import { useState, ReactNode, MouseEventHandler } from 'react';
import { VALID_INPUT_RESULT, inputCellType } from '~/contants';
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';
import { validateInput } from '~/utils';
import { getUnit, proccessValueType } from '~/utils/common';
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
                InputProps={{
                    endAdornment: <InputAdornment position="end">{getUnit(dataKey)}</InputAdornment>
                }}
            ></TextField>
        </TableCell>
    );
};

const InforCell = ({
    value,
    colSpan
}: {
    value: string | number | ReactNode | null;
    colSpan?: number;
}) => {
    return (
        <TableCell
            align={typeof value === 'object' ? 'left' : 'center'}
            colSpan={colSpan ? colSpan : 1}
        >
            <div onClick={(e) => e.stopPropagation()}>{value}</div>
        </TableCell>
    );
};

const EventMenuCell = ({ rowId }: { rowId: number }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { removeRowById, addRowAboveById, addRowBelowById, addSumRowBelowById } =
        useMaterialData();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (option: 'delete' | 'addBelow' | 'addAbove' | 'addSumBelow') => {
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
            case 'addSumBelow':
                addSumRowBelowById(rowId);
                break;
            default:
                break;
        }
        setAnchorEl(null);
    };
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Button onClick={handleClick}>
                <MenuIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItemWithIcon
                    handleClick={() => handleClose('delete')}
                    icon={<Delete />}
                    text="Xoá hàng này"
                />
                <MenuItemWithIcon
                    handleClick={() => handleClose('addBelow')}
                    icon={<Add />}
                    text="Thêm 1 hàng bên dưới"
                />
                <MenuItemWithIcon
                    handleClick={() => handleClose('addAbove')}
                    icon={<Add />}
                    text="Thêm 1 hàng bên trên"
                />
                <MenuItemWithIcon
                    handleClick={() => handleClose('addSumBelow')}
                    icon={<Add />}
                    text="Thêm hàng tính CỘNG bên dưới"
                />
            </Menu>
        </div>
    );
};

const MenuItemWithIcon = ({
    handleClick,
    icon,
    text
}: {
    handleClick: MouseEventHandler<HTMLLIElement>;
    icon: JSX.Element;
    text: string;
}) => {
    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
        </MenuItem>
    );
};

const AccordionCell = ({
    open,
    rowId,
    isDetailsEmpty
}: {
    open: boolean;
    rowId: number;
    isDetailsEmpty: boolean;
}) => {
    const { addSubRowsById } = useMaterialData();
    const ArrowIcon = () => (open ? <KeyboardArrowUp /> : <KeyboardArrowDown />);
    return (
        <TableCell>
            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <EventMenuCell rowId={rowId} />
                </Grid>
                <Grid item xs={6}>
                    <Button>
                        {isDetailsEmpty ? (
                            <Add
                                onClick={() => {
                                    addSubRowsById(rowId);
                                }}
                            />
                        ) : (
                            <ArrowIcon />
                        )}
                    </Button>
                </Grid>
            </Grid>
        </TableCell>
    );
};

const MaterialCells = ({
    isAccordion,
    isAccordionOpen,
    isDetailsEmpty,
    data
}: {
    isAccordion?: boolean;
    isAccordionOpen?: boolean;
    isDetailsEmpty?: boolean;
    data: ConstructionSettlementTable | ConstructionSettlement;
}) => {
    const { updateRowDataById } = useMaterialData();
    const { id, order, category, length, width, quantity, squareMeters, price, totalCost, isSum } =
        data;

    const updateValue = (key: keyof ConstructionSettlement, value: string | number | null) => {
        updateRowDataById(id, key, value);
    };

    const isSumRow = !isAccordion && isSum;

    return (
        <>
            <InforCell value={order} />
            <InputCell value={category} dataKey="category" updateValue={updateValue} />
            {isSumRow ? (
                <InforCell value="CỘNG" colSpan={3} />
            ) : (
                <>
                    <InputCell value={length} dataKey="length" updateValue={updateValue} />
                    <InputCell value={width} dataKey="width" updateValue={updateValue} />
                    <InputCell value={quantity} dataKey="quantity" updateValue={updateValue} />
                </>
            )}

            <InforCell value={squareMeters} />
            {isSum ? (
                <InputCell value={price} dataKey="price" updateValue={updateValue} />
            ) : (
                <InforCell value={price === 0 ? undefined : price} />
            )}
            <InforCell value={totalCost} />
            {isAccordion ? (
                <AccordionCell
                    open={isAccordionOpen!}
                    rowId={id}
                    isDetailsEmpty={!!isDetailsEmpty}
                />
            ) : (
                <InforCell value={<EventMenuCell rowId={id} />} />
            )}
        </>
    );
};

export { AccordionCell, EventMenuCell, InforCell, InputCell, MaterialCells };
