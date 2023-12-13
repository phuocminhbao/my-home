import { useContext } from 'react';
import MaterialDataContext from '../context/MaterialDataContext';
import { getInitAccordionRowData } from '~/utils';

const useMaterialData = () => {
    const { data, updateData } = useContext(MaterialDataContext);

    const generateData = () => {
        updateData((data) => [...data, getInitAccordionRowData()]);
    };

    return { data, generateData };
};

export default useMaterialData;
