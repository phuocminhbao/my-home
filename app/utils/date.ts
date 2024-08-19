export const toHours = (milisecond: number | string): number => {
    if (typeof milisecond === 'string') {
        milisecond = parseInt(milisecond);
    }
    return Math.floor(milisecond / (1000 * 60 * 60));
};
