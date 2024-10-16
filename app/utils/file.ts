import FileSaver from 'file-saver';

export const download = (file: string | Blob, fileName: string) => {
    FileSaver.saveAs(file, fileName);
};
