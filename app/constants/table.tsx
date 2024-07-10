import type { ConstructionSettlement } from '~/types';

export const columnType = [
    { key: 'index', header: 'STT' },
    { key: 'category', header: 'HẠNG MỤC' },
    { key: 'length', header: 'DÀI' },
    { key: 'width', header: 'RỘNG' },
    { key: 'quantity', header: 'SL' },
    {
        key: 'squareMeters',
        header: (
            <>
                M<sup>2</sup>
            </>
        )
    },
    { key: 'price', header: 'ĐƠN GIÁ' },
    { key: 'totalCost', header: 'THÀNH TIỀN' }
];

export const colWidth: Record<string, string> = {
    event: '2%',
    index: '5%',
    category: '20%',
    length: '12%',
    width: '12%',
    quantity: '8%',
    squareMeters: '9%',
    price: '12%',
    totalCost: '12%'
};

export const initDetailsRowData: ConstructionSettlement = {
    isSelected: false,
    id: 0,
    order: null,
    category: '',
    length: 0,
    width: 0,
    quantity: 0,
    squareMeters: null,
    price: 0,
    totalCost: null,
    isSum: false,
    isMultiply: false
};

export const MIN_TABLE_WIDTH = '75px';

export const inputCellType: Record<string, string> = {
    string: 'text',
    number: 'number'
};

export const tableFontSize = {
    style: {
        fontSize: 20
    }
};
