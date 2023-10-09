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

// Global value for below function
var key = 0;

export function getUniqueID() {
    key += 1;
    return key;
}
