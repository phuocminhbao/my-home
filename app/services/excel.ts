import axios, { AxiosResponse } from 'axios';
import { ROUTE_PATH } from '~/constants';
import { ExcelDownload } from '~/types';

const EXCEL_CONTENT_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const validateContentType = (headers: AxiosResponse<any, any>['headers']) => {
    const contentType = headers['content-type'];
    if (contentType !== EXCEL_CONTENT_TYPE) {
        throw new Error('Unexpected file type');
    }
};

const getFileName = (headers: AxiosResponse<any, any>['headers']) => {
    const disposition = headers['content-disposition'] as string;
    const fileInfo = disposition.replaceAll(' ', '').split(';')[1];
    if (!fileInfo.includes('filename')) {
        throw new Error('content-disposition have been the format');
    }
    return fileInfo.split('=')[1];
};

export const generateExcel = async (excel: ExcelDownload) => {
    const res = await axios.post(
        ROUTE_PATH.EXCEL_DOWNLOAD,
        {
            ...excel
        },
        {
            responseType: 'blob'
        }
    );
    validateContentType(res.headers);

    return { excelBlob: res.data, fileName: getFileName(res.headers) };
};
