import * as fs from 'fs';

const importFileContents = (filePath: string): string => {
    let data = '';

    try {
        data = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error('Error importing file:', err);
    }

    return data;
};

export { importFileContents };
