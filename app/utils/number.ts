const toRoman = (number: number): string => {
    const roman: Record<string, number> = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    let str = '';
    for (const i of Object.keys(roman)) {
        const q = Math.floor(number / roman[i]);
        number -= q * roman[i];
        str += i.repeat(q);
    }
    return str;
};

const roundNumber = (number: number, decimalPlaces: number = 2): number => {
    return Number(number.toFixed(decimalPlaces));
};

export { toRoman, roundNumber };
