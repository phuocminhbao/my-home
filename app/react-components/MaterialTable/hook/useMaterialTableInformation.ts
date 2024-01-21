import { useEffect, useState } from 'react';

const useMaterialTableInformation = () => {
    const [rowsNumber, setRowsNumber] = useState(0);
    useEffect(() => {
        const tableHead = document.querySelector('thead tr')?.children.length;
        setRowsNumber(tableHead ?? 0);
    }, []);

    return { rowsNumber };
};

export default useMaterialTableInformation;
