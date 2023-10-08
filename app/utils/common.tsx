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

// Globa value for below function
var key = 0;

export function getUniqueKey() {
    key += 1;
    return key;
}
