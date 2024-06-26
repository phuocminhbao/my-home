const COLUMNS = [
    { key: 'order', header: 'STT' },
    { key: 'category', header: 'HẠNG MỤC' },
    { key: 'length', header: 'DÀI' },
    { key: 'width', header: 'RỘNG' },
    { key: 'quantity', header: 'SL' },
    { key: 'squareMeters', header: 'M2' },
    { key: 'price', header: 'ĐƠN GIÁ' },
    { key: 'totalCost', header: 'THÀNH TIỀN' }
];

const SUM_VALUE = 'CỘNG';
const TOTAL_SUM_VALUE = 'TỔNG CỘNG';
const START_MERGED_TITLE_CELL = 'A1';
const END_MERGED_TITLE_CELL = 'H1';
const FIRST_ROW_INDEX = 1;
const SECOND_ROW_INDEX = 2;

export {
    COLUMNS,
    SUM_VALUE,
    START_MERGED_TITLE_CELL,
    END_MERGED_TITLE_CELL,
    FIRST_ROW_INDEX,
    SECOND_ROW_INDEX,
    TOTAL_SUM_VALUE
};
