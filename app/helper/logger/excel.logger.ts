import { ROUTE_PATH } from '~/constants';
import Logger from '.';

class ExcelLogger {
    private logger = Logger.Instance.getLogger();
    private actionContext = 'Proccess Excel';
    private logInfo = {
        context: this.actionContext,
        requestId: ROUTE_PATH.EXCEL
    };

    public info(message: string) {
        this.logger.info(message, this.logInfo);
    }

    public error(e: string) {
        this.logger.error(e, this.logInfo);
    }

    public getActionContext() {
        return this.actionContext;
    }
}

export default ExcelLogger;
