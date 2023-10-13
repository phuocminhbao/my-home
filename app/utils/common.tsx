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
