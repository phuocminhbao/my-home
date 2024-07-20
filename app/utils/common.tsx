import _ from 'lodash';
import type { ConstructionSettlement } from '~/types';

export const getUnit = (type: string) => {
    switch (type) {
        case 'length':
        case 'width':
            return 'm';
        case 'squareMeters':
            return (
                <>
                    m<sup>2</sup>
                </>
            );
        case 'price':
            return '$';
        case 'quantity':
        case 'category':
        default:
            return '';
    }
};

export const proccessValueType = (
    dataKey: keyof ConstructionSettlement,
    value: string | number
): string | number => {
    switch (dataKey) {
        case 'length':
            if (_.isString(value) && value !== '') {
                return value.replace(/\s/g, '');
            } else return Number(value);
        case 'width':
        case 'squareMeters':
        case 'quantity':
        case 'price':
            return Number(String(value).replace(',', ''));
        case 'totalCost':
            return Number(value);
        case 'category':
        default:
            return String(value);
    }
};
