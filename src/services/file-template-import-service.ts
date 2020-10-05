import * as fs from 'fs';

const importFileContents = (filePath: string): string => {
    console.log();
    console.log(`======== IMPORT FILE (${filePath}) - START ========`);

    let data = '';

    try {
        data = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error('Error importing file:', err);
    }

    console.log('File data:', data);

    console.log(`======== IMPORT FILE (${filePath}) - END ========`);
    console.log();

    return data;
};

export { importFileContents };
