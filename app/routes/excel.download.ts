import type { ActionFunctionArgs } from '@remix-run/node';
import { generateExcelBuffer } from '~/exceljs';
import type { ConstructionSettlementTable } from '~/types';
import ExcelLogger from '~/helper/logger/excel.logger';
import { InternalServerError } from '~/helper/response/error';

type ExcelDownload = {
    constructionName: string;
    data: ConstructionSettlementTable[];
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const LOGGER = new ExcelLogger();
    try {
        const { constructionName, data } = (await request.json()) as ExcelDownload;
        LOGGER.info('Starting generate excel file');
        const buffer = await generateExcelBuffer(data, constructionName);
        LOGGER.info('Finished generate excel file');

        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename=quyet-toan-cong-trinh.xlsx',
                'Content-Length': String(buffer.byteLength)
            }
        });
    } catch (e) {
        LOGGER.error((e as Error).stack ?? '');
        return new InternalServerError('Can not generate the excel file');
    }
};
