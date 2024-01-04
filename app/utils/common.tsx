import _ from 'lodash';
import { ConstructionSettlement } from '~/types';

export function getUnit(type: string) {
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
}

export function idHandler() {
    let key = 0;
    return {
        getUniqueID: () => {
            return key++;
        }
    };
}

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
        case 'totalCost':
            return Number(value);
        case 'category':
        default:
            return String(value);
    }
};
