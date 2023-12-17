import { useContext } from 'react';
import MaterialDataContext from '../context/MaterialDataContext';
import { getInitAccordionRowData } from '~/utils';
import _ from 'lodash';

const useMaterialData = () => {
    const { data, updateData } = useContext(MaterialDataContext);

    const generateData = () => {
        updateData((data) => [...data, getInitAccordionRowData()]);
    };

    const getRowData = (id: number) => {
        return data.find((row) => {
            if(row.id === id) return row

            if(!_.isEmpty(row.details)) {
                return row.details!.find((subRow) => {
                    if(subRow.id === id) return subRow
                })
            }
        })
    }

    return { data, generateData };
};

export default useMaterialData;
