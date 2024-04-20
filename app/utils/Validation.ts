import _ from 'lodash';
import { VALID_INPUT_RESULT } from '~/contants';
import type { ConstructionSettlement, ValidateResult } from '~/types';

const validateNumber = (value: number): ValidateResult => {
    let error = '';
    if (_.isNaN(value)) {
        error = 'Không phải là số hợp lệ';
    }
    if (value < 0) {
        error += 'Giá trị không được nhỏ hơn 0';
    }

    return {
        okay: _.isEmpty(error),
        error
    };
};

const validateSumInput = (value: string): ValidateResult => {
    let error = '';
    const splitedNumbers = value.split('+');
    splitedNumbers.forEach((number) => {
        if (_.isNaN(Number(number)) || Number(number) < 0 || number === '') {
            error += number + ', ';
        }
    });

    const isErrorEmpty = _.isEmpty(error);
    if (!isErrorEmpty) {
        const lastCommaIndex = error.lastIndexOf(', ');
        if (lastCommaIndex !== -1) {
            // Remove last comma
            error = error.slice(0, lastCommaIndex);
        }
        error += ' chưa đúng định dạng';
    }

    return {
        okay: _.isEmpty(error),
        error
    };
};

const validateInput = (
    dataKey: keyof ConstructionSettlement,
    value: string | number,
    isMerge?: boolean
): ValidateResult => {
    switch (dataKey) {
        case 'length':
            if (value === 'cộng' || value === 'tổng cộng') {
                return VALID_INPUT_RESULT;
            }
            if (_.isNumber(value) || !isMerge) {
                return validateNumber(Number(value));
            }
            return validateSumInput(value as string);
        case 'width':
        case 'squareMeters':
        case 'quantity':
        case 'price':
            return validateNumber(value as number);
        default:
            return VALID_INPUT_RESULT;
    }
};

export { validateInput };
